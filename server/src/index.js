import express from "express";
import cors from "cors";
import { StreamChat } from "stream-chat";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";

const app = express();

app.use(cors());
app.use(express.json());
const api_key = "sd4ca37t84sx";
const api_secret =
  "xby459h7bw54kbv26uexeh38ukffd77ts4qwst74vmk474ww5tu9x7zghabgmzsx";

const serverClient = StreamChat.getInstance(api_key, api_secret);

app.post("/signup", async (req, res) => {
  try {
    const { fullName, username, email, password } = req.body;
    const userId = uuidv4();
    const hashedPassword = await bcrypt.hash(password, 10);
    const token = serverClient.createToken(userId);
    res.json({ token, userId, fullName, email, username, hashedPassword });
  } catch (error) {
    res.json(error);
  }
});

app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const { users } = await serverClient.queryUsers({ name: username });

    if (users.length == 0) return res.json({ message: "Username not found" });

    const token = serverClient.createToken(users[0].id);
    const passwordMatch = await bcrypt.compare(
      password,
      users[0].hashedPassword
    );

    if (passwordMatch) {
      res.json({
        token,
        firstName: users[0].fullName,
        email: users[0].email,
        username,
        userId: users[0].id,
      });
    }
  } catch (error) {
    res.json(error);
  }
});

app.listen(3001, () => {
  console.log("server running");
});
