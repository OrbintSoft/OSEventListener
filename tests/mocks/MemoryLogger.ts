import Logger from '../../src/utilities/Logger';
export default class MemoryLogger implements Logger {
	debugMessages: unknown[] = [];
	errorMessages: unknown[] = [];
	infoMessages: unknown[] = [];
	logMessages: unknown[] = [];
	traceMessages: unknown[] = [];
	warnMessages: unknown[] = [];

	debug(...data: unknown[]): void {
		this.debugMessages.push(data);
	}
	error(...data: unknown[]): void {
		this.errorMessages.push(data);
	}
	info(...data: unknown[]): void {
		this.infoMessages.push(data);
	}
	log(...data: unknown[]): void {
		this.logMessages.push(data);
	}
	trace(...data: unknown[]): void {
		this.traceMessages.push(data);
	}
	warn(...data: unknown[]): void {
		this.warnMessages.push(data);
	}
}