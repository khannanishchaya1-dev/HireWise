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



const skillGapSchema = z.object({
  jobTitle: z.string().describe("Job title from the job description"),

  totalSkillsInJD: z.number().describe(
    "Total number of skills required in the job description"
  ),

  matchedSkillsCount: z.number().describe(
    "Number of skills matched between resume and JD"
  ),

  missingSkillsCount: z.number().describe(
    "Number of skills missing from the resume"
  ),

  matchScore: z.number().min(0).max(100).describe(
    "Overall skill match percentage"
  ),

  matchedSkills: z.array(
    z.string()
  ).describe(
    "Skills present in both resume and job description"
  ),

  missingSkills: z.array(
    z.string()
  ).describe(
    "Skills required in JD but missing from resume"
  ),

  additionalSkills: z.array(
    z.string()
  ).describe(
    "Skills present in resume but not explicitly required in JD"
  ),

  strengths: z.array(
    z.string()
  ).describe(
    "Candidate strengths relevant to this job"
  ),

  weaknesses: z.array(
    z.string()
  ).describe(
    "Candidate weaknesses for this job role"
  ),

  recommendations: z.array(
    z.string()
  ).describe(
    "Suggestions to improve suitability for this role"
  ),

  learningRoadmap: z.array(
    z.string()
  ).describe(
    "Ordered list of topics/skills the candidate should learn"
  ),

  overallSuitability: z.string().describe(
    "Overall assessment of candidate fit for the role"
  ),
});

async function skillGapDetectionByAi(
  resume,
  jobDescription
) {
  try {
    const prompt = `
Analyze the candidate's resume against the given job description.

Provide analysis according to the schema.

Provide:
- jobTitle
- totalSkillsInJD
- matchedSkillsCount
- missingSkillsCount
- matchScore
- matchedSkills
- missingSkills
- additionalSkills
- strengths
- weaknesses
- recommendations
- learningRoadmap
- overallSuitability

Resume:
${resume}

Job Description:
${jobDescription}
`;

    console.log("Before Skill Gap Analysis");

    const response =
      await aiService.models.generateContent({
        model: "gemini-2.5-flash-lite",

        contents: prompt,

        config: {
          responseMimeType: "application/json",

          responseSchema:
            zodToJsonSchema(skillGapSchema),
        },
      });

    console.log(response.text);

    return JSON.parse(response.text);

  } catch (error) {
    console.log(error);
    throw error;
  }
}

module.exports = { invokeAiService, resumeAnalysisbyAi,skillGapDetectionByAi };

