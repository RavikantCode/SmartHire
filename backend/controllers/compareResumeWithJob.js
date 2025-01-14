const compareResumeWithJob = (resumeInfo, jobDescription) => {
  if (!resumeInfo || !jobDescription) return 0; 

  const cleanResumeInfo = resumeInfo.replace(/\s+/g, ' ').trim().toLowerCase();
  const cleanJobDescription = jobDescription.replace(/\s+/g, ' ').trim().toLowerCase();

 
  const resumeWords = cleanResumeInfo.split(/[\s,]+/)

  const jobWords = cleanJobDescription.split(/[\s,]+/);


  const resumeWordsSet = new Set(resumeWords);
  const jobWordsSet = new Set(jobWords);

    const matchingKeywords = [...resumeWordsSet].filter(word => jobWordsSet.has(word)); 

  
  const matchScore = matchingKeywords.length;

  return matchScore;
};

export default compareResumeWithJob;
