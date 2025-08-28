import { PrismaClient } from "../generated/prisma";
import bcrypt from "bcryptjs";
const prisma  = new PrismaClient();

async function main() {
    const alice = await prisma.user.upsert({
        where:{ number: '1111111111'},
        update: {},
        create: {
            number: '1111111111',
            email: 'alice@example.com',
            name: 'Alice',
            password: await bcrypt.hash('alice', 10),
            Balance:{
                create:{
                    amount: 20000,
                    locked:0
                }
            },
            OnRampTransaction:{
                create:{
                    startTime: new Date(),
                    status: 'Success',
                    amount: 20000,
                    token: 'token_1',
                    provider:"HDFC Bank"
                },
            },
        },
    }),
    const bob = await prisma.user.upsert({
        where:{ number: '2222222222'},
        update: {},
        create: {
            number: '2222222222',
            email: 'bob@example.com',
            name: 'Bob',
            password: await bcrypt.hash('bob', 10),
            Balance:{
                create:{
                    amount: 10000,
                    locked:0
                }
            },
            OnRampTransaction:{
                create:{
                    startTime: new Date(),
                    status: 'Success',
                    amount: 10000,
                    token: 'token_1',
                    provider:"HDFC Bank"
                },
            },
        },
    })
    console.log({alice , bob})

}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })