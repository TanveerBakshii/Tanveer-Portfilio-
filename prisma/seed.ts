import { PrismaClient, SkillCategory } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // Create admin user
  const hashedPassword = await bcrypt.hash('admin123', 10)
  const admin = await prisma.user.upsert({
    where: { email: 'tanveerbakshii@gmail.com' },
    update: {},
    create: {
      email: 'tanveerbakshii@gmail.com',
      name: 'Tanveer Bakshi',
      password: hashedPassword,
      role: 'ADMIN',
    },
  })
  console.log('✅ Admin user created:', admin.email)

  // Create profile
  const profile = await prisma.profile.upsert({
    where: { id: '1' },
    update: {},
    create: {
      id: '1',
      name: 'Tanveer Bakshi A',
      role: 'Healthcare Data Analyst & AI Systems Integrator',
      tagline: 'Turning complex data into clean decisions.',
      experience: '7+ Years',
      location: 'Bengaluru, India',
      phone: '+91-9844999202',
      email: 'tanveerbakshii@gmail.com',
      linkedin: 'https://linkedin.com/in/tanveerbakshii',
      bio: `I am a Healthcare Data Analyst with over 7 years of experience in EMR/EHR systems, healthcare data management, and AI-driven automation. My expertise spans across US healthcare workflows, HL7/FHIR interoperability, and Revenue Cycle Management (RCM).

I specialize in building dashboards, automating reporting workflows, and ensuring data quality across healthcare systems. My goal is to help healthcare organizations make data-driven decisions that improve patient outcomes and operational efficiency.

Currently pursuing MBA in Healthcare Management while working on cutting-edge healthcare AI integrations.`,
      shortBio: 'Healthcare Data Analyst with 7+ years experience in EMR/EHR systems, HL7/FHIR, and AI automation. Building dashboards that save lives.',
      isPublic: true,
    },
  })
  console.log('✅ Profile created:', profile.name)

  // Create experience entries
  const experiences = [
    {
      company: 'Epic Systems Integration',
      title: 'Senior Healthcare Data Analyst',
      location: 'Bengaluru, India',
      startDate: new Date('2021-03-01'),
      isCurrent: true,
      description: 'Leading data analytics initiatives for US healthcare providers using Epic EMR systems.',
      impact: [
        'Reduced reporting latency by 40% through automated dashboard implementations',
        'Built claim-quality dashboards used by 120+ users across 6 departments',
        'Implemented FHIR-based data exchange reducing integration time by 60%',
        'Streamlined revenue cycle reporting, improving clean claim rate to 94%',
      ],
      skills: ['Epic', 'SQL', 'Power BI', 'HL7/FHIR', 'Python', 'RCM'],
      order: 1,
    },
    {
      company: 'Cerner Healthcare Solutions',
      title: 'Healthcare Data Analyst',
      location: 'Bengaluru, India',
      startDate: new Date('2019-06-01'),
      endDate: new Date('2021-02-28'),
      isCurrent: false,
      description: 'Managed healthcare data workflows and reporting for multiple hospital networks.',
      impact: [
        'Developed automated reporting pipelines saving 20+ hours weekly',
        'Created interactive Tableau dashboards for C-suite executives',
        'Improved data accuracy by 35% through quality monitoring systems',
        'Supported L1/L2/L3 production support for critical healthcare applications',
      ],
      skills: ['Cerner', 'Tableau', 'SQL', 'Excel', 'JIRA', 'Freshdesk'],
      order: 2,
    },
    {
      company: 'Practo Technologies',
      title: 'EMR Support Specialist',
      location: 'Bengaluru, India',
      startDate: new Date('2017-08-01'),
      endDate: new Date('2019-05-31'),
      isCurrent: false,
      description: 'Provided technical support and data management for Practo\'s EMR platform.',
      impact: [
        'Supported Epic/Cerner modules across 6 departments',
        'Resolved 500+ critical data issues with 99% SLA compliance',
        'Trained 50+ staff members on EMR best practices',
        'Contributed to UAT and QA processes for new feature releases',
      ],
      skills: ['EMR', 'SQL', 'Excel', 'UAT', 'QA', 'Technical Support'],
      order: 3,
    },
  ]

  for (const exp of experiences) {
    await prisma.experience.create({ data: exp })
  }
  console.log('✅ Experience entries created')

  // Create projects
  const projects = [
    {
      title: 'RCM Performance Dashboard',
      slug: 'rcm-performance-dashboard',
      summary: 'Comprehensive revenue cycle management dashboard with real-time KPIs.',
      description: 'Built a comprehensive RCM dashboard that provides real-time visibility into revenue cycle performance. The dashboard tracks key metrics including claim clean rate, denial rate, days in AR, and collection efficiency.',
      challenge: 'Healthcare organization struggled with fragmented revenue data across multiple systems, leading to delayed decision-making and revenue leakage.',
      solution: 'Integrated data from Epic, billing systems, and payer portals into a unified Power BI dashboard with automated data refresh and alerting.',
      outcome: 'Reduced days in AR by 15%, improved clean claim rate to 94%, and saved 25 hours per week in manual reporting.',
      metrics: {
        cleanClaimRate: '94%',
        daysInAR: '32 days',
        timeSaved: '25 hrs/week',
        revenueImpact: '$2.3M',
      },
      technologies: ['Power BI', 'SQL', 'Epic', 'Python', 'Azure'],
      skills: ['Data Visualization', 'ETL', 'Healthcare Analytics', 'RCM'],
      featured: true,
      order: 1,
    },
    {
      title: 'FHIR Data Quality Monitor',
      slug: 'fhir-data-quality-monitor',
      summary: 'Real-time FHIR data quality monitoring and validation system.',
      description: 'Developed a monitoring system that validates FHIR data exchange between healthcare systems, ensuring data integrity and compliance with interoperability standards.',
      challenge: 'Data quality issues in FHIR exchanges were causing integration failures and patient safety concerns.',
      solution: 'Built an automated validation engine with real-time alerts, data quality scoring, and trend analysis.',
      outcome: 'Reduced integration failures by 78%, improved data quality score from 72% to 96%.',
      metrics: {
        dataQualityScore: '96%',
        failureReduction: '78%',
        validationTime: '< 2 min',
        systemsMonitored: '12',
      },
      technologies: ['FHIR', 'Python', 'PostgreSQL', 'React', 'Node.js'],
      skills: ['HL7/FHIR', 'Data Quality', 'API Integration', 'Full Stack'],
      featured: true,
      order: 2,
    },
    {
      title: 'AI-Assisted Chart Review Triage',
      slug: 'ai-chart-review-triage',
      summary: 'ML-powered system for prioritizing medical chart reviews.',
      description: 'Implemented an AI-driven triage system that prioritizes chart reviews based on complexity, risk factors, and historical patterns, optimizing reviewer workload.',
      challenge: 'Manual chart review process was time-consuming and prone to missing high-risk cases.',
      solution: 'Deployed machine learning models to score and prioritize charts, routing complex cases to senior reviewers.',
      outcome: 'Increased review throughput by 45%, reduced turnaround time from 48 to 24 hours.',
      metrics: {
        throughputIncrease: '45%',
        turnaroundTime: '24 hrs',
        accuracy: '92%',
        casesProcessed: '50K+',
      },
      technologies: ['Python', 'TensorFlow', 'SQL', 'Power BI', 'GCP'],
      skills: ['Machine Learning', 'Healthcare AI', 'Data Science', 'Automation'],
      featured: true,
      order: 3,
    },
    {
      title: 'Provider Productivity Reporting',
      slug: 'provider-productivity-reporting',
      summary: 'Automated productivity analytics for healthcare providers.',
      description: 'Created automated reporting system that tracks provider productivity metrics, patient volumes, and clinical documentation completeness.',
      challenge: 'Manual productivity reports were delayed and lacked standardization across departments.',
      solution: 'Built automated ETL pipelines and standardized dashboards with role-based access.',
      outcome: 'Eliminated manual reporting, improved provider satisfaction score by 30%.',
      metrics: {
        reportingTime: 'Real-time',
        providerSatisfaction: '+30%',
        departments: '8',
        providersTracked: '150+',
      },
      technologies: ['SQL', 'Tableau', 'Epic', 'Python', 'AWS'],
      skills: ['ETL', 'Data Warehousing', 'Healthcare Analytics', 'Reporting'],
      featured: false,
      order: 4,
    },
  ]

  for (const proj of projects) {
    await prisma.project.create({ data: proj })
  }
  console.log('✅ Projects created')

  // Create skills
  const skills = [
    { name: 'SQL', category: SkillCategory.DATA_REPORTING, proficiency: 95, description: 'Advanced querying, optimization, and database design' },
    { name: 'Power BI', category: SkillCategory.DATA_REPORTING, proficiency: 92, description: 'Dashboard creation, DAX, data modeling' },
    { name: 'Tableau', category: SkillCategory.DATA_REPORTING, proficiency: 88, description: 'Visualization, calculated fields, dashboard design' },
    { name: 'Excel', category: SkillCategory.DATA_REPORTING, proficiency: 95, description: 'Advanced formulas, VBA, pivot tables, Power Query' },
    { name: 'Epic', category: SkillCategory.HEALTHCARE, proficiency: 90, description: 'EMR workflows, reporting workbench, clarity data model' },
    { name: 'Cerner', category: SkillCategory.HEALTHCARE, proficiency: 85, description: 'PowerChart, reporting, system administration' },
    { name: 'HL7/FHIR', category: SkillCategory.HEALTHCARE, proficiency: 88, description: 'Interoperability standards, API integration, data exchange' },
    { name: 'RCM', category: SkillCategory.HEALTHCARE, proficiency: 90, description: 'Revenue cycle workflows, claim management, denial analysis' },
    { name: 'US Healthcare', category: SkillCategory.HEALTHCARE, proficiency: 92, description: 'Payer/provider workflows, compliance, regulations' },
    { name: 'Python', category: SkillCategory.ENGINEERING, proficiency: 75, description: 'Data analysis, automation, scripting, pandas' },
    { name: 'APIs & Integrations', category: SkillCategory.ENGINEERING, proficiency: 82, description: 'REST APIs, webhooks, data pipelines' },
    { name: 'GCP', category: SkillCategory.ENGINEERING, proficiency: 70, description: 'BigQuery, Cloud Functions, data services' },
    { name: 'JIRA', category: SkillCategory.COLLABORATION, proficiency: 90, description: 'Project management, agile workflows, reporting' },
    { name: 'Freshdesk', category: SkillCategory.COLLABORATION, proficiency: 88, description: 'Ticketing, support workflows, SLA management' },
    { name: 'ClickUp', category: SkillCategory.COLLABORATION, proficiency: 85, description: 'Task management, documentation, collaboration' },
  ]

  for (const skill of skills) {
    await prisma.skill.create({ data: skill })
  }
  console.log('✅ Skills created')

  // Create tools
  const tools = [
    { name: 'PostgreSQL', category: 'Database', description: 'Primary database for analytics' },
    { name: 'SQL Server', category: 'Database', description: 'Enterprise data warehousing' },
    { name: 'MySQL', category: 'Database', description: 'Application databases' },
    { name: 'BigQuery', category: 'Cloud', description: 'Google Cloud data warehouse' },
    { name: 'Azure', category: 'Cloud', description: 'Microsoft cloud services' },
    { name: 'AWS', category: 'Cloud', description: 'Amazon Web Services' },
    { name: 'Git', category: 'Development', description: 'Version control' },
    { name: 'VS Code', category: 'Development', description: 'Primary IDE' },
    { name: 'Postman', category: 'Development', description: 'API testing' },
    { name: 'Figma', category: 'Design', description: 'UI/UX design' },
  ]

  for (const tool of tools) {
    await prisma.tool.create({ data: tool })
  }
  console.log('✅ Tools created')

  // Create education
  const education = [
    {
      institution: 'Indira Gandhi National Open University',
      degree: 'MBA',
      field: 'Healthcare Management',
      isCurrent: true,
      description: 'Specializing in healthcare administration and health informatics',
      order: 1,
    },
    {
      institution: 'Rajiv Gandhi University of Health Sciences',
      degree: 'B.Sc',
      field: 'Medical Record Technology',
      isCurrent: false,
      description: 'Comprehensive training in medical records management and healthcare data',
      order: 2,
    },
    {
      institution: 'Government Medical College',
      degree: 'Diploma',
      field: 'Medical Record Technology',
      isCurrent: false,
      description: 'Foundation in healthcare documentation and data management',
      order: 3,
    },
  ]

  for (const edu of education) {
    await prisma.education.create({ data: edu })
  }
  console.log('✅ Education created')

  // Create certifications
  const certifications = [
    {
      name: 'Epic Clarity Data Model',
      issuer: 'Epic Systems',
      isPublic: true,
      order: 1,
    },
    {
      name: 'HL7 FHIR Fundamentals',
      issuer: 'HL7 International',
      isPublic: true,
      order: 2,
    },
    {
      name: 'Google Data Analytics',
      issuer: 'Google',
      isPublic: true,
      order: 3,
    },
    {
      name: 'Power BI Data Analyst',
      issuer: 'Microsoft',
      isPublic: true,
      order: 4,
    },
  ]

  for (const cert of certifications) {
    await prisma.certification.create({ data: cert })
  }
  console.log('✅ Certifications created')

  // Create testimonials
  const testimonials = [
    {
      name: 'Dr. Sarah Mitchell',
      role: 'Chief Medical Officer',
      company: 'Metro Health Systems',
      quote: 'Tanveer turned our reporting backlog into a live dashboard in weeks. His understanding of healthcare workflows is exceptional, and the impact on our decision-making was immediate.',
      isPublic: true,
      order: 1,
    },
    {
      name: 'Rajesh Kumar',
      role: 'VP of Revenue Cycle',
      company: 'Premier Healthcare',
      quote: 'Reliable, clear, and always thinking about the end user. Tanveer\'s RCM dashboard saved us countless hours and helped identify revenue opportunities we didn\'t know existed.',
      isPublic: true,
      order: 2,
    },
    {
      name: 'Lisa Chen',
      role: 'Director of IT',
      company: 'Unity Medical Group',
      quote: 'The FHIR integration Tanveer built was flawless. His technical skills combined with healthcare domain knowledge made complex interoperability challenges seem simple.',
      isPublic: true,
      order: 3,
    },
  ]

  for (const test of testimonials) {
    await prisma.testimonial.create({ data: test })
  }
  console.log('✅ Testimonials created')

  // Create blog posts
  const blogs = [
    {
      title: 'Designing Dashboards for Busy Clinicians',
      slug: 'designing-dashboards-for-clinicians',
      excerpt: 'Key principles for creating healthcare dashboards that clinicians actually want to use.',
      content: `# Designing Dashboards for Busy Clinicians

Healthcare dashboards often fail not because of technical limitations, but because they ignore the reality of clinical workflows. Here are key principles I've learned...

## 1. Start with the Decision

Every dashboard should answer a specific question. What decision will this dashboard help make?

## 2. Respect Cognitive Load

Clinicians are already managing complex information. Your dashboard should reduce, not add to, their mental burden.

## 3. Mobile-First Matters

Doctors check metrics between patients. Design for the phone first, desktop second.

## 4. Actionable Over Comprehensive

Better to show 5 metrics that drive action than 50 that create confusion.`,
      tags: ['Dashboard Design', 'Healthcare UX', 'Data Visualization'],
      readTime: 5,
      featured: true,
      isPublic: true,
      publishedAt: new Date('2024-01-15'),
    },
    {
      title: 'FHIR Implementation: Lessons from the Field',
      slug: 'fhir-implementation-lessons',
      excerpt: 'Real-world insights from implementing FHIR-based interoperability in healthcare systems.',
      content: `# FHIR Implementation: Lessons from the Field

After implementing FHIR integrations across multiple healthcare systems, here are the key lessons learned...

## Start with Data Quality

FHIR can't fix bad data. Before any integration, audit your source data.

## Plan for Versioning

FHIR standards evolve. Build versioning into your architecture from day one.

## Security is Not Optional

Healthcare data requires extra care. Implement robust authentication and audit logging.

## Test with Real Data

Synthetic data won't catch edge cases. Use de-identified production data for testing.`,
      tags: ['FHIR', 'Interoperability', 'Healthcare IT'],
      readTime: 7,
      featured: true,
      isPublic: true,
      publishedAt: new Date('2024-02-20'),
    },
    {
      title: 'Reducing Claim Rework with Better Data Quality',
      slug: 'reducing-claim-rework',
      excerpt: 'How improved data quality at the point of capture can dramatically reduce claim denials.',
      content: `# Reducing Claim Rework with Better Data Quality

Claim denials cost healthcare organizations millions. Here's how data quality improvements can help...

## The True Cost of Denials

Beyond the obvious revenue impact, denied claims create administrative burden and delay patient care.

## Prevention at the Source

The best time to fix data quality issues is at the point of capture. Real-time validation is key.

## Building a Quality Culture

Technology alone won't solve this. Train staff on why data quality matters.

## Measure and Monitor

You can't improve what you don't measure. Track denial reasons and trends over time.`,
      tags: ['RCM', 'Data Quality', 'Healthcare Finance'],
      readTime: 6,
      featured: false,
      isPublic: true,
      publishedAt: new Date('2024-03-10'),
    },
  ]

  for (const blog of blogs) {
    await prisma.blog.create({ data: blog })
  }
  console.log('✅ Blog posts created')

  // Create settings
  const settings = [
    { key: 'site_title', value: 'Tanveer Portfolio OS', description: 'Website title', isPublic: true },
    { key: 'site_description', value: 'Healthcare Data Analyst & AI Systems Integrator', description: 'Meta description', isPublic: true },
    { key: 'analytics_enabled', value: 'true', description: 'Enable analytics tracking', isPublic: false },
    { key: 'contact_form_enabled', value: 'true', description: 'Enable contact form', isPublic: false },
    { key: 'theme_primary', value: '#0B3A45', description: 'Primary theme color', isPublic: true },
    { key: 'theme_accent', value: '#F6C76D', description: 'Accent theme color', isPublic: true },
  ]

  for (const setting of settings) {
    await prisma.setting.create({ data: setting })
  }
  console.log('✅ Settings created')

  console.log('\n🎉 Database seeding completed!')
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })