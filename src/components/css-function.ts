export const hover = (...args: string[]) =>
  args.map((change) => `hover:${change} `).reduce((a, b) => a + b);
