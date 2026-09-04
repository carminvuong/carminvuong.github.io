// Everything on the page that isn't a project writeup lives here.
// Edit this file to update the site — no markup changes needed.

export const profile = {
  name: 'Minh Vuong',
  alias: '(Carmin)',

  // The browser tab title. Every page uses this verbatim.
  siteTitle: 'Carmin Vuong',
  location: 'Brooklyn, NY',
  email: 'mgvuong@gmail.com',

  // ── Fill these in ──────────────────────────────────────────────
  github: 'https://github.com/carminvuong',
  linkedin: 'https://www.linkedin.com/in/carmin-vuong',

  // Any of these may be an empty string — the thing it controls just
  // disappears from the page rather than rendering blank.

  // Drop the file in public/ and name it here. Whatever you put in public/
  // is copied to the site root verbatim, so public/favicon.png → '/favicon.png'.
  favicon: '/favicon.ico',

  // Drop the PDF at public/Minh_Vuong_Resume.pdf to show a résumé link.
  resume: '',
  // ───────────────────────────────────────────────────────────────

  status: 'Probably doing LeetCode...',
  lede:
    "Computer Science & Mathematics @ NYU. I build full-stack systems that hold " +
    "up in front of real users, and models that have to be right about matches " +
    "that haven't been played yet.",
  metaDescription:
    'Minh (Carmin) Vuong — Computer Science & Mathematics at NYU. Full-stack ' +
    'engineering and predictive modeling. Seeking Summer 2027 software engineering internships.',
  closing: '',
};

export type Role = {
  title: string;
  org: string;
  dates: string;
  /** One compact line: stack, then the numbers that matter. Keep it scannable. */
  detail: string;
  /**
   * Long form. Not currently rendered — the Experience section uses `detail`
   * instead. To switch back to bullets, pass `points={role.points}` to
   * <RoleEntry> in src/pages/index.astro and swap `.roles-list` for `.stack-md`.
   */
  points: string[];
};

export const experience: Role[] = [
  {
    title: 'Software Development Intern',
    org: 'NYU CREATE Lab',
    dates: 'Jan 2026 — Present',
    detail: 'React, AdonisJS, TypeScript · 5 classrooms · 150+ students',
    points: [
      'Engineered a full-stack learning platform in React, AdonisJS and TypeScript, deployed to five low-resource classrooms and serving personalized AI-assisted instruction to over 150 students.',
      'Built a real-time interaction telemetry pipeline with secure authentication, processing behavioral events into MongoDB to drive engagement analytics.',
    ],
  },
  {
    title: 'Software Engineering Mentee',
    org: 'Google',
    dates: 'Feb 2023 — Jun 2024',
    detail: 'Django · external API integration · 500+ daily listings aggregated',
    points: [
      'Built a Django job-search platform with secure authentication, integrating external APIs to aggregate 500+ daily listings and cut manual search time.',
      'Received weekly technical mentorship from a Google software engineer on system design, code review practice, and API integration.',
    ],
  },
  {
    title: 'Software Engineering Lead',
    org: 'FIRST Robotics Team 694 · StuyPulse',
    dates: 'Sep 2021 — Jun 2024',
    detail: 'Java, WPILib, PID control · 95% autonomous success rate · 30+ members trained',
    points: [
      'Implemented Java PID control for drivetrain and intake subsystems, reaching a 95% autonomous task success rate across competition matches.',
      'Trained 30+ team members on Java, WPILib and control theory for FRC robot development.',
    ],
  },
  {
    title: 'Co-Founder',
    org: 'Py4All',
    dates: 'Jun 2022 — Aug 2022',
    detail: 'Custom Python curriculum · 200+ students enrolled · taught a class of 40',
    points: [
      'Co-founded a youth coding camp and scaled enrollment past 200 students on a custom Python curriculum.',
      'Wrote the curriculum and taught programming fundamentals to a class of 40.',
    ],
  },
];

export const education = [
  {
    school: 'New York University',
    detail: 'B.A. Computer Science & Mathematics · GPA 3.86',
    dates: 'Sep 2024 — May 2028',
    coursework:
      'Data Structures · Algorithms · Operating Systems · Computer Systems Organization · Linear Algebra · Real Analysis',
  },
  {
    school: 'Stuyvesant High School',
    detail: 'New York, NY · GPA 4.0',
    dates: 'Sep 2020 — Jun 2024',
    coursework: '',
  },
];

export const skills = [
  { label: 'Languages', items: ['Python', 'TypeScript', 'Java', 'SQL', 'JavaScript', 'C'] },
  { label: 'Frameworks', items: ['React', 'Next.js', 'Django', 'Flask', 'Express.js', 'AdonisJS'] },
  { label: 'Machine learning', items: ['TensorFlow', 'scikit-learn', 'XGBoost', 'NumPy', 'pandas'] },
  { label: 'Data', items: ['MongoDB', 'MySQL'] },
  { label: 'Tools', items: ['Git', 'Docker', 'Linux', 'GitLab', 'Agile'] },
];
