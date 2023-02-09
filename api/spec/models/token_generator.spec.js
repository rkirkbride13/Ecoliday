const JWT = require("jsonwebtoken");
const TokenGenerator = require("../../models/token_generator");

describe("TokenGenerator", () => {
  describe("jsonwebtoken", () => {
    test("returns a token containing user_id that is valid for 10 minutes", () => {
      const user_id = 1;
      const token = TokenGenerator.jsonwebtoken(user_id);
      const payload = JWT.decode(token, process.env.JWT_SECRET);
      expect(payload.user_id).toEqual(user_id);
    });
  });
});