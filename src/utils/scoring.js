// Normalize rating 1–5 to 0–100
function normalize(score, min = 1, max = 5) {
  const avg = (score - min) / (max - min)
  return Math.round(avg * 100)
}

// Define career matches
const CAREER_MAP = [
  {
    id: 'data_science',
    name: 'Data Science / Analytics',
    description: 'Analyze data to discover insights — investigative & conscientiousness skills required.',
    match: { interests: ['investigative'], personality: ['conscientiousness', 'openness'] }
  },
  {
    id: 'software_engineering',
    name: 'Software Engineering',
    description: 'Build software products — investigative & realistic interests, conscientious personality.',
    match: { interests: ['investigative','realistic'], personality: ['conscientiousness'] }
  },
  {
    id: 'design',
    name: 'Design / Architecture / Creative Media',
    description: 'Visual/spatial design — artistic interest and openness.',
    match: { interests: ['artistic'], personality: ['openness'] }
  },
  {
    id: 'medicine',
    name: 'Medicine / Healthcare',
    description: 'Care for people — social interest and high conscientiousness.',
    match: { interests: ['social'], personality: ['conscientiousness','emotional_stability'] }
  },
  {
    id: 'business',
    name: 'Business / Management / Entrepreneurship',
    description: 'Lead teams or ventures — enterprising interest and extraversion help.',
    match: { interests: ['enterprising','conventional'], personality: ['extraversion'] }
  },
  {
    id: 'engineering_core',
    name: 'Core Engineering (Mechanical / Civil / Electrical)',
    description: 'Hands-on engineering — realistic interest and conscientiousness.',
    match: { interests: ['realistic'], personality: ['conscientiousness'] }
  },
  {
    id: 'teaching_social',
    name: 'Teaching / Social Services',
    description: 'Support and educate others — social interest and agreeableness.',
    match: { interests: ['social'], personality: ['agreeableness'] }
  },
]

// Main function to calculate results
export function calculateResults(answers) {
  const traitBuckets = {}
  const interestBuckets = {}

  Object.keys(answers).forEach(qId => {
    const val = answers[qId]
    // Determine if question is personality or interest
    if (qId <= 10) { // personality questions
      const tagMap = {
        1:'conscientiousness',2:'extraversion',3:'openness',4:'emotional_stability',5:'agreeableness',
        6:'conscientiousness',7:'extraversion',8:'openness',9:'conscientiousness',10:'agreeableness'
      }
      const tag = tagMap[qId]
      if (!traitBuckets[tag]) traitBuckets[tag] = []
      traitBuckets[tag].push(val)
    } else { // interest questions
      const tagMap = {
        11:'investigative',12:'artistic',13:'social',14:'enterprising',15:'realistic',
        16:'investigative',17:'conventional',18:'realistic',19:'artistic',20:'conventional'
      }
      const tag = tagMap[qId]
      if (!interestBuckets[tag]) interestBuckets[tag] = []
      interestBuckets[tag].push(val)
    }
  })

  // Compute average normalized scores
  const traitScores = {}
  Object.keys(traitBuckets).forEach(k => {
    const avg = traitBuckets[k].reduce((a,b)=>a+b,0)/traitBuckets[k].length
    traitScores[k] = normalize(avg)
  })

  const interestScores = {}
  Object.keys(interestBuckets).forEach(k => {
    const avg = interestBuckets[k].reduce((a,b)=>a+b,0)/interestBuckets[k].length
    interestScores[k] = normalize(avg)
  })

  // Compute career matches
  const results = CAREER_MAP.map(c => {
    let score = 0
    const interestMatch = c.match.interests
    const personalityMatch = c.match.personality

    if (interestMatch.length > 0) {
      const sum = interestMatch.reduce((s,tag) => s + (interestScores[tag]||0),0)
      score += (sum/interestMatch.length)*0.6
    }
    if (personalityMatch.length > 0) {
      const sum = personalityMatch.reduce((s,tag) => s + (traitScores[tag]||0),0)
      score += (sum/personalityMatch.length)*0.4
    }
    return {...c, rawScore: Math.round(score)}
  })

  const max = Math.max(...results.map(r=>r.rawScore))
  const normalized = results.map(r=>({ ...r, score: max>0 ? Math.round((r.rawScore/max)*100):0 }))
    .sort((a,b)=>b.score - a.score)

  return { normalized, traitScores, interestScores }
}
