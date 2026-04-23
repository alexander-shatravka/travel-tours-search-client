export const SearchStatus = {
  Idle:       'idle',
  Searching:  'searching',
  Polling:    'polling',
  Success:    'success',
  Empty:      'empty',
  Error:      'error',
  Cancelling: 'cancelling',
} as const;

export type SearchStatus = typeof SearchStatus[keyof typeof SearchStatus];
