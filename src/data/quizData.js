export const quizData = {
  'tech-trivia': {
    title: 'Tech Trivia',
    description: 'Test your knowledge on CS fundamentals',
    icon: '🧠',
    color: '#667eea',
    questions: [
      {
        id: 1,
        question: 'What does OS stand for in computer science?',
        options: ['Operating System', 'Object Storage', 'Online Service', 'Optical Scanner'],
        correct: 0,
        explanation: 'Operating System (OS) manages hardware resources and software applications.',
        hint: 'Think of what manages your computer — Windows, macOS, Linux are all examples.'
      },
      {
        id: 2,
        question: 'Which data structure uses LIFO (Last In First Out)?',
        options: ['Queue', 'Stack', 'Array', 'Tree'],
        correct: 1,
        explanation: 'Stack uses LIFO principle. Think of a stack of plates - you take from the top.',
        hint: 'LIFO = Last In First Out. Think of a stack of plates or a browser back button.'
      },
      {
        id: 3,
        question: 'What is the primary purpose of a database management system (DBMS)?',
        options: ['Store and manage data efficiently', 'Create web pages', 'Compile code', 'Compress files'],
        correct: 0,
        explanation: 'DBMS stores, retrieves, and manages data securely and efficiently.',
        hint: 'DBMS is all about organizing and managing data. Think databases like MySQL, PostgreSQL.'
      },
      {
        id: 4,
        question: 'Which sorting algorithm has the best average-case time complexity?',
        options: ['Bubble Sort', 'Quick Sort', 'Selection Sort', 'Insertion Sort'],
        correct: 1,
        explanation: 'Quick Sort has O(n log n) average time complexity, making it very efficient.',
        hint: 'Look for the algorithm with O(n log n) complexity. Quick and Merge sorts are known for speed.'
      },
      {
        id: 5,
        question: 'What is the OSI model used for?',
        options: ['Standardizing network communication', 'Managing databases', 'Creating user interfaces', 'Encrypting passwords'],
        correct: 0,
        explanation: 'The OSI (Open Systems Interconnection) model standardizes network protocols.',
        hint: 'OSI = Open Systems Interconnection. It\'s about networking and how systems communicate.'
      }
    ]
  },
  'guess-output': {
    title: 'Guess the Output',
    description: 'Predict console output from code snippets',
    icon: '💻',
    color: '#f093fb',
    questions: [
      {
        id: 1,
        question: 'What is the output?\n\nPython:\nprint(2 ** 3)',
        options: ['6', '8', '5', '9'],
        correct: 1,
        explanation: '** is the exponentiation operator. 2 ** 3 = 2³ = 8',
        hint: '** means "power of" or exponentiation. What is 2 raised to the power of 3?'
      },
      {
        id: 2,
        question: 'What is the output?\n\nJava:\nSystem.out.println(10 / 3);',
        options: ['3.33...', '3', '4', '3.0'],
        correct: 1,
        explanation: 'In Java, integer division (10 / 3) results in integer 3, not 3.33',
        hint: 'Both 10 and 3 are integers in Java. Integer division drops the decimal part.'
      },
      {
        id: 3,
        question: 'What is the output?\n\nPython:\nprint("hello" * 3)',
        options: ['hellohellohello', 'Error', '3', 'hellohello'],
        correct: 0,
        explanation: 'In Python, string * number repeats the string n times.',
        hint: 'In Python, multiplying a string by a number repeats it. "hello" * 3 = ?'
      },
      {
        id: 4,
        question: 'What is the output?\n\nC:\nprintf("%d", 5 % 2);',
        options: ['2.5', '2', '1', '0'],
        correct: 2,
        explanation: 'The modulo operator (%) returns remainder. 5 % 2 = 1',
        hint: 'The % operator gives you the remainder. 5 divided by 2 leaves what remainder?'
      },
      {
        id: 5,
        question: 'What is the output?\n\nJava:\nint x = 5;\nSystem.out.println(++x);',
        options: ['5', '6', '7', '4'],
        correct: 1,
        explanation: '++x is pre-increment, so x becomes 6 before printing.',
        hint: '++x means increment BEFORE using. x starts at 5, so it becomes 6 first.'
      }
    ]
  },
  'bug-buster': {
    title: 'Bug Buster',
    description: 'Identify bugs in code snippets',
    icon: '🐛',
    color: '#fa709a',
    questions: [
      {
        id: 1,
        question: 'Which line has a bug?\n\nLine 1: int x = 10\nLine 2: x = x + 5\nLine 3: System.out.println(x);',
        options: ['Line 1', 'Line 2', 'Line 3', 'No bug'],
        correct: 0,
        explanation: 'Line 1 is missing a semicolon. Java requires ; at end of statements.',
        hint: 'Look at the end of each line. Java statements need a semicolon to terminate.'
      },
      {
        id: 2,
        question: 'What is the bug?\n\nint[] arr = new int[3];\narr[3] = 5;',
        options: ['Missing semicolon', 'Array index out of bounds', 'Wrong data type', 'No bug'],
        correct: 1,
        explanation: 'Array of size 3 has indices 0, 1, 2. Accessing arr[3] causes ArrayIndexOutOfBoundsException.',
        hint: 'Arrays are 0-indexed. An array of size 3 has valid indices 0, 1, 2. Index 3 is too high!'
      },
      {
        id: 3,
        question: 'Identify the bug:\n\nif (x = 5)\n    System.out.println("Equal");',
        options: ['Using = instead of ==', 'Missing semicolon', 'Wrong data type', 'No bug'],
        correct: 0,
        explanation: 'Should use == for comparison. = is assignment operator, not comparison.',
        hint: '= is assignment, == is comparison. For if statements, use == to check equality.'
      },
      {
        id: 4,
        question: 'What is wrong?\n\nString str = null;\nSystem.out.println(str.length());',
        options: ['Null pointer exception', 'String too long', 'Missing semicolon', 'No bug'],
        correct: 0,
        explanation: 'Calling method on null causes NullPointerException. Check for null first.',
        hint: 'str is null. You can\'t call methods on null. Check if str != null first!'
      },
      {
        id: 5,
        question: 'Which line has a bug?\n\nLine 1: for(int i=0; i<5; i++)\nLine 2:     System.out.println(i)',
        options: ['Line 1', 'Line 2', 'Both', 'No bug'],
        correct: 1,
        explanation: 'Line 2 is missing semicolon at end. Each statement needs semicolon in Java.',
        hint: 'Every statement in Java needs to end with a semicolon. Check line 2.'
      }
    ]
  }
};

export const shuffleArray = (array) => {
  return [...array].sort(() => Math.random() - 0.5);
};

export const getTopScores = () => {
  const scores = localStorage.getItem('quizScores');
  if (!scores) return [];
  return JSON.parse(scores).sort((a, b) => {
    if ((b.percentage || 0) !== (a.percentage || 0)) return (b.percentage || 0) - (a.percentage || 0);
    const ta = a.isoDate ? new Date(a.isoDate).getTime() : 0;
    const tb = b.isoDate ? new Date(b.isoDate).getTime() : 0;
    return tb - ta;
  }).slice(0, 10);
};

export const saveScore = (topic, score, maxScore, username) => {
  const scores = localStorage.getItem('quizScores');
  const scoresArray = scores ? JSON.parse(scores) : [];
  const topicKeys = Object.keys(quizData);
  let topicKey = topicKeys.find((k) => k === topic || quizData[k].title === topic);
  let topicTitle = topicKey ? quizData[topicKey].title : topic;
  if (!topicKey) topicKey = topic;
  const now = new Date();
  // Prevent near-duplicate saves (e.g. double effect runs in React Strict Mode)
  const last = scoresArray.length > 0 ? scoresArray[scoresArray.length - 1] : null;
  if (last) {
    const sameUser = last.username === username;
    const sameTopic = last.topic === topicKey || last.topicTitle === topicTitle || last.topic === topicTitle;
    const sameScore = last.score === score && last.maxScore === maxScore;
    const lastTime = last.isoDate ? new Date(last.isoDate).getTime() : 0;
    if (sameUser && sameTopic && sameScore && (now.getTime() - lastTime) < 3000) {
      // Duplicate detected within 3s — skip saving
      try {
        localStorage.setItem('quizScores', JSON.stringify(scoresArray));
      } catch (e) {
        // ignore storage errors
      }
      return;
    }
  }

  scoresArray.push({
    id: Date.now(),
    username,
    topic: topicKey,
    topicTitle,
    score,
    maxScore,
    percentage: Math.round((score / maxScore) * 100),
    date: now.toLocaleDateString(),
    isoDate: now.toISOString()
  });
  localStorage.setItem('quizScores', JSON.stringify(scoresArray));
};

export const getQuizHistory = (username) => {
  const scores = localStorage.getItem('quizScores');
  if (!scores) return [];
  try {
    const arr = JSON.parse(scores);
    const wanted = (username || '').toString().trim().toLowerCase();

    // normalize entries: ensure percentage exists and normalize username
    const normalized = arr.map((s) => {
      const uname = (s.username || '').toString();
      const percentage = typeof s.percentage === 'number' ? s.percentage : (s.maxScore ? Math.round((s.score / s.maxScore) * 100) : null);
      return { ...s, username: uname, percentage };
    });

    // filter by case-insensitive username match
    const filtered = normalized.filter((s) => (s.username || '').toString().trim().toLowerCase() === wanted);

    // dedupe similar consecutive entries (by id or isoDate+topic+score)
    const seen = new Set();
    const deduped = [];
    for (const s of filtered) {
      const key = s.id || `${s.username}|${s.topic}|${s.score}|${s.isoDate || s.date}`;
      if (seen.has(key)) continue;
      seen.add(key);
      deduped.push(s);
    }

    return deduped;
  } catch (e) {
    return [];
  }
};
