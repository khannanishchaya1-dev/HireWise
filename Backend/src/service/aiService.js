const { GoogleGenAI } = require("@google/genai");
const {z} = require("zod");
const { zodToJsonSchema } = require("zod-to-json-schema");
const aiService = new GoogleGenAI({
  apiKey: process.env.GoogleGenAI_API_KEY,
});
async function invokeAiService() {
  const response = await aiService.models.generateContent({
    model: "gemini-2.5-flash-lite",
    contents: "Explain What is interview preparation and how it can help job seekers.",
  })
  console.log(response.text);
}
const resumeAnalysisSchema = z.object({
  candidateName: z.string().describe("Name of the candidate"),
  summary: z.string().describe("Summary of the candidate's experience"),
  skills: z.array(z.string()).describe("List of skills"),
  strengths: z.array(z.string()).describe("List of strengths"),
  weaknesses: z.array(z.string()).describe("List of weaknesses"),
  projects: z.array(z.object({
    name: z.string().describe("Name of the project"),
    description: z.string().describe("Description of the project"),
  })),
  education: z.array(
    z.object({
      institute: z.string().describe("Name of the educational institution"),
      degree: z.string().describe("Degree obtained"),
      year: z.string().describe("Year of graduation"),
    })
  ),
  experience: z.array(
    z.object({
      company: z.string().describe("Name of the company"),
      role: z.string().describe("Job role"),
      duration: z.string().describe("Duration of employment"),
    })
  ),

  atsScore: z.number().min(0).max(100),

  overallScore: z.number().min(0).max(100),

  recommendations: z.array(z.string()),

});



async function resumeAnalysisbyAi(resume){
  try{
 
const prompt = `
Analyze the resume and Provide according to following Schema.


Provide:
-candidateName
- summary
- skills
- strengths
- weaknesses
- projects
- education
- experience
- atsScore
- overallScore
- recommendations

Resume:
${resume}
`;
console.log("Before");
const response = await aiService.models.generateContent({
  model: "gemini-2.5-flash-lite",
  contents: prompt,
  config:{
    responseMimeType: "application/json",
    responseSchema: zodToJsonSchema(resumeAnalysisSchema),
  }

})
console.log(response.text);

return JSON.parse(response.text);
  }catch(error){
    console.log(error);
    throw error;
  }
}

module.exports = { invokeAiService, resumeAnalysisbyAi };

