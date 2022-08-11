export default {
  port: 1337,
  host: 'localhost',
  dbUri:
    'mongodb://root:root@cluster0-shard-00-00.qw9wb.mongodb.net:27017,cluster0-shard-00-01.qw9wb.mongodb.net:27017,cluster0-shard-00-02.qw9wb.mongodb.net:27017/?ssl=true&replicaSet=atlas-i0yrbl-shard-0&authSource=admin&retryWrites=true&w=majority',
  accessTokenTtl: '50m',
  jwtRefreshTokenTtl: '1y',
  privateKey: `-----BEGIN RSA PRIVATE KEY-----
MIICXAIBAAKBgQCjWIoq19C/nsgD+CbOvzNMl7cQpBF44g7KjTeu5KTDeEa0kUjP
IuXW/8db+BkM1QdPxZdTfObavlsa/oAlUx6z6GBTNQgCJSMrk6DFh2+FFeDXOb+5
soCIBeyrzMXKHw55iclAcieqH28Rt1KTiW6Of6I9I8rCW1hnmXG1OE/joQIDAQAB
AoGBAKJdJOGXKdj+xEQlyrVhGmW8vGvfGbr1wMwXeMzwWtItYOKlMyEpyBpgnlJN
luDJc34YouWK1pGB+18msEvphi6pdnRKuLnCh11fBvNvwFWnl4urWy+mAZesCsao
n0FL8ujwJLeo2vWMxmwfzLhw2jMYN16TBep5x/KHg8/d7y1RAkEAzkj57dZBDH7v
A4ebcz2zCXCdXGFBnYJhXSm2/BJ7ZtnQ+sryr4fYktdZ3IVlLOLXW5tceue7LaI2
0NeTNshKVQJBAMq2X6bNgrmjRCxjxicXDo5mibsS9yrliTFkQbxjNdbObbuiLYeS
i8S77oyLMtPUMXVjUMacKuXZcpks/BCJmB0CQDqn34E0Wfy+nyHmzlnfYmg9wFED
SpAKAbtm4CQe8T3Wk6isSoOE4h0m5ONiftlbixb+Pzana77XEDUkBzUdkJ0CQACh
iLKwORPy2id5OAivHbB7yTn32SUdCcxJj5rShDxi8ByBaLrfTegS3a86T7IxGuZO
pNW5brjAcIbhiPdUNlECQH6eWYwyMO0AwK+NAnCDtttLkNnGWxxSPZk0tHj/AeI2
uTDkQHuluhFWmPDvzhGMy9sO/OZ+jMgrxCRw04l62ig=
-----END RSA PRIVATE KEY-----`,
}
