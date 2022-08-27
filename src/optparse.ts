import minimist from 'minimist'

export function optparse(argv: string[]) {
  return minimist(argv, {
    alias: {
      w: 'watch',
      p: 'port'
    },
    default: {
      w: true,
      p: 3323
    }
  })
}
