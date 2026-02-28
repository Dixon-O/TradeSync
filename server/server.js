/**
 * DukaImara Mock Sync Server
 * Express.js server for receiving delta patches, returning merged state,
 * and simulating failures for demo purposes.
 */
import express from 'express';
import cors from 'cors';
import { getAll, get, put, logSync, getSyncLog, clear } from './store.js';

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json({ limit: '5mb' }));

// ===== Simulation controls =====
let _simulateFailure = false;
let _simulateLatency = 0;

// ===== Sync endpoint =====
app.post('/api/sync', async (req, res) => {
    // Simulate failure if enabled
    if (_simulateFailure) {
        logSync({ action: 'SIMULATED_FAILURE', deviceId: req.body.deviceId });
        return res.status(500).json({ error: 'Simulated server failure' });
    }

    // Simulate latency
    if (_simulateLatency > 0) {
        await new Promise(resolve => setTimeout(resolve, _simulateLatency));
    }

    try {
        const { deviceId, operations, timestamp } = req.body;

        if (!operations || !Array.isArray(operations)) {
            return res.status(400).json({ error: 'Invalid payload: operations array required' });
        }

        const results = [];

        for (const op of operations) {
            const { table, id, operation, delta, hlc } = op;

            switch (operation) {
                case 'CREATE':
                case 'UPDATE':
                    const existing = get(table, id);
                    const merged = existing ? { ...existing, ...delta } : { id, ...delta };
                    merged._hlc = hlc;
                    merged._lastSynced = Date.now();
                    put(table, id, merged);
                    results.push({ id, status: 'ok', operation });
                    break;

                case 'DELETE':
                    const record = get(table, id);
                    if (record) {
                        record._tombstone = true;
                        put(table, id, record);
                    }
                    results.push({ id, status: 'ok', operation: 'DELETE' });
                    break;

                default:
                    results.push({ id, status: 'error', error: `Unknown operation: ${operation}` });
            }
        }

        logSync({
            action: 'SYNC_RECEIVED',
            deviceId,
            operationCount: operations.length,
            timestamp
        });

        res.json({
            success: true,
            results,
            serverTimestamp: Date.now()
        });

    } catch (err) {
        logSync({ action: 'SYNC_ERROR', error: err.message });
        res.status(500).json({ error: err.message });
    }
});

// ===== State endpoints =====
app.get('/api/state/:table', (req, res) => {
    const records = getAll(req.params.table);
    res.json({ table: req.params.table, records, count: records.length });
});

app.get('/api/state', (req, res) => {
    const tables = ['products', 'sales', 'credits'];
    const state = {};
    for (const t of tables) {
        state[t] = getAll(t);
    }
    res.json(state);
});

// ===== Sync log =====
app.get('/api/sync-log', (req, res) => {
    res.json(getSyncLog());
});

// ===== Simulation controls =====
app.post('/api/simulate-failure', (req, res) => {
    _simulateFailure = req.body.enabled !== false;
    logSync({ action: 'SIMULATION_TOGGLED', type: 'failure', enabled: _simulateFailure });
    res.json({ simulateFailure: _simulateFailure });
});

app.post('/api/simulate-latency', (req, res) => {
    _simulateLatency = parseInt(req.body.latencyMs) || 0;
    logSync({ action: 'SIMULATION_TOGGLED', type: 'latency', latencyMs: _simulateLatency });
    res.json({ simulateLatency: _simulateLatency });
});

app.post('/api/reset', (req, res) => {
    clear();
    _simulateFailure = false;
    _simulateLatency = 0;
    res.json({ success: true, message: 'Server state cleared' });
});

// ===== Health check =====
app.get('/api/health', (req, res) => {
    res.json({
        status: 'ok',
        uptime: process.uptime(),
        simulateFailure: _simulateFailure,
        simulateLatency: _simulateLatency
    });
});

// ===== Start =====
app.listen(PORT, () => {
    console.log(`\n🔄 DukaImara Sync Server running on http://localhost:${PORT}`);
    console.log(`   POST /api/sync           — Receive sync operations`);
    console.log(`   GET  /api/state/:table    — View server state for a table`);
    console.log(`   GET  /api/state           — View all server state`);
    console.log(`   GET  /api/sync-log        — View sync activity log`);
    console.log(`   POST /api/simulate-failure — Toggle simulated failures`);
    console.log(`   POST /api/simulate-latency — Set artificial latency (ms)`);
    console.log(`   POST /api/reset           — Clear all server state\n`);
});
