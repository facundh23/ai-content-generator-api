import app from "./src/app.js";

console.log("API Key loaded:", process.env.OPENAI_API_KEY ? "YES" : "NO");
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 AI Content Generator API running on port ${PORT}`);
  console.log(`📝 Environment: ${process.env.NODE_ENV}`);
  console.log(`🌐 Health check: http://localhost:${PORT}/health`);
  console.log(`🤖 Content API: http://localhost:${PORT}/api/content/health`);
});
