// Temporary navigationDebugger utility to fix import error
export const navigationDebugger = {
  log: (message: string) => {
    if (process.env.NODE_ENV === 'development') {
      console.log('[Navigation Debug]:', message);
    }
  }
};