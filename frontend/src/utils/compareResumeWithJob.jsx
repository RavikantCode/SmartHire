const compareResumeWithJob = (resumeInfo, jobDescription) => {
    if (!resumeInfo || !jobDescription) return 0; 
  
    const cleanResumeInfo = resumeInfo.replace(/\s+/g, ' ').trim().toLowerCase();
    const cleanJobDescription = jobDescription.replace(/\s+/g, ' ').trim().toLowerCase();
  
    console.log("Cleaned Resume Info:", cleanResumeInfo);  
    console.log("Cleaned Job Description:", cleanJobDescription);  
 
    const resumeWords = cleanResumeInfo.split(' ');
    const jobWords = cleanJobDescription.split(' ');
  
   
    const matchingKeywords = resumeWords.filter(word => jobWords.includes(word));
  
 
    const matchScore = matchingKeywords.length;
  
    console.log("Matching Keywords:", matchingKeywords);
    console.log("Match Score:", matchScore);
  
    return matchScore;
  };
  
  export default compareResumeWithJob;
  