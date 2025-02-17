const { execSync } = require('child_process')

try {
  execSync('prisma generate')
} catch (error) {
  console.error('Failed to generate Prisma client:', error)
  process.exit(1)
}
