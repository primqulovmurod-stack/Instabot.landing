// Simple in-memory storage for pending Instagram sessions
// Key: username, Value: session data (state, password, 2fa info)

export const pendingSessions = new Map<string, any>();
