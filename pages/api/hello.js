// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
  res.status(200).json({ ip });
}
