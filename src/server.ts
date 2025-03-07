import express from 'express';
import path from 'path';
const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'client/build')));

app.get('*', (_req: unknown, res: { sendFile: (arg0: string) => void; }) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
