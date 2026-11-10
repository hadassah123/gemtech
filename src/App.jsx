import { useEffect, useState } from 'react'
import {
  Link,
  NavLink,
  Navigate,
  Route,
  Routes,
  useLocation,
  useParams,
} from 'react-router-dom'
import logoImage from './assets/GEM TECH.png'
import './App.css'

const WHATSAPP_URL = 'https://wa.me/2347043018282'

const learningAreas = [
  {
    title: 'Coding & Programming',
    description: 'Children learn how software works and how to build their own projects.',
  },
  {
    title: 'Python',
    description: 'Beginner-friendly programming with practical projects.',
  },
  {
    title: 'Robotics',
    description: 'Hands-on technology projects that combine logic, design and problem-solving.',
  },
  {
    title: 'Web Development',
    description: 'HTML, CSS and JavaScript in a way that feels creative and practical.',
  },
  {
    title: 'Creative Technology',
    description: 'Technology combined with creativity, design and problem-solving.',
  },
  {
    title: 'AI & Emerging Technology',
    description: 'Age-appropriate introductions to AI and modern digital tools.',
  },
  {
    title: 'Digital Skills',
    description: 'Practical tech skills children can use beyond the classroom.',
  },
]

const programmes = [
  {
    id: 'scratch',
    slug: 'scratch',
    name: 'Scratch Programming',
    ageRange: '8-12 years',
    level: 'Beginner',
    duration: '6-8 weeks',
    format: 'Live online classes',
    price: 'Contact us for current programme details.',
    badge: 'Creative',
    description:
      'A fun introduction to coding where learners use Scratch to create animations, stories and interactive games.',
    outcomes: ['Sequences', 'Events', 'Loops', 'Conditionals', 'Animation', 'Game design'],
    projectPreview: 'Interactive stories, animated scenes and simple games.',
    summary:
      'A visual, beginner-friendly way for young learners to explore coding concepts and bring their own creative ideas to life.',
  },
  {
    id: 'web',
    slug: 'web',
    name: 'Web Development',
    ageRange: '10-16 years',
    level: 'Beginner',
    duration: '6-8 weeks',
    format: 'Live online classes',
    price: 'Contact us for current programme details.',
    badge: 'Create',
    description:
      'Learners discover how websites are made and build their own pages using the core tools of the web.',
    outcomes: ['HTML', 'CSS', 'Web layouts', 'Images and links', 'Responsive design', 'Publishing basics'],
    projectPreview: 'Personal pages, themed websites and creative web projects.',
    summary:
      'A practical introduction to building websites, from structuring a page to styling it and sharing it online.',
  },
  {
    id: 'python',
    slug: 'python',
    name: 'Python Programming',
    ageRange: '10-16 years',
    level: 'Beginner to intermediate',
    duration: '8-10 weeks',
    format: 'Live online classes',
    price: 'Contact us for current programme details.',
    badge: 'Featured',
    description:
      'Learners build a strong foundation in Python by exploring core programming ideas and applying them in projects.',
    outcomes: ['Variables', 'Data types', 'Conditions', 'Loops', 'Functions', 'Problem solving'],
    projectPreview: 'Mini games, creative coding challenges and simple applications.',
    summary:
      'A guided introduction to text-based programming for learners ready to develop their coding skills and create practical projects.',
  },
  {
    id: 'ai',
    slug: 'ai',
    name: 'Artificial Intelligence',
    ageRange: '10-16 years',
    level: 'Beginner',
    duration: '6-8 weeks',
    format: 'Live online classes',
    price: 'Contact us for current programme details.',
    badge: 'Explore',
    description:
      'Learners explore what AI is, how it is used and how to think about it creatively, responsibly and critically.',
    outcomes: ['AI foundations', 'Patterns and data', 'AI tools', 'Creative applications', 'Responsible use', 'Critical thinking'],
    projectPreview: 'Guided experiments and age-appropriate projects using AI concepts and tools.',
    summary:
      'An accessible introduction to artificial intelligence that builds curiosity and encourages thoughtful, responsible use of technology.',
  },
  {
    id: 'robotics',
    slug: 'robotics',
    name: 'Robotics',
    ageRange: '8-16 years',
    level: 'Beginner to intermediate',
    duration: '6-8 weeks',
    format: 'Live online classes',
    price: 'Contact us for current programme details.',
    badge: 'Build',
    description:
      'Learners discover robotics through hands-on challenges that bring together design, logical thinking and coding.',
    outcomes: ['Robotics basics', 'Sensors', 'Logic and sequencing', 'Automation', 'Testing and iteration', 'Project builds'],
    projectPreview: 'Robot challenges, simple automated systems and prototype builds.',
    summary:
      'A practical programme for learners who enjoy building, problem-solving and seeing ideas become working systems.',
  },
]

const faqs = [
  {
    question: 'What age groups do you teach?',
    answer:
      'GemTech is designed for children and teenagers, with programmes grouped by age and experience so the teaching stays relevant and supportive.',
  },
  {
    question: 'Does my child need previous coding experience?',
    answer:
      'No. Many learners begin with little or no experience. We teach in a way that is clear, encouraging and designed for beginners as well as growing coders.',
  },
  {
    question: 'What laptop does my child need?',
    answer:
      'A laptop or desktop computer with a stable internet connection is ideal. A quiet learning space and basic software access are also recommended for the programme.',
  },
  {
    question: 'Are classes live or recorded?',
    answer:
      'Classes are designed to be live and instructor-led so students can ask questions, work through projects and receive guidance in real time. Recording access may be provided depending on the programme structure.',
  },
  {
    question: 'How long is each class?',
    answer:
      'Class length varies by programme. The structure is designed to be focused, practical and manageable for children and teenagers.',
  },
  {
    question: 'How many classes are there?',
    answer:
      'Each programme has a defined schedule and number of sessions. This is shared clearly before enrolment so families know what to expect.',
  },
  {
    question: 'What happens if my child misses a class?',
    answer:
      'We aim to support learners with clear guidance and practical next steps. Missed sessions are handled in line with the individual programme structure and support arrangements.',
  },
  {
    question: 'Do you provide recordings?',
    answer:
      'Recording access may be available depending on the programme. This is communicated clearly before a learner joins a cohort.',
  },
  {
    question: 'Is the programme suitable for beginners?',
    answer:
      'Yes. GemTech is built for learners who are curious and ready to begin, with teaching that introduces concepts in age-appropriate ways and moves at a steady pace.',
  },
  {
    question: 'What software will my child need?',
    answer:
      'This depends on the programme. Learners may need access to tools such as Python, a browser, and any required learning software, which is shared in advance.',
  },
  {
    question: 'Do parents need to know how to code?',
    answer:
      'Not at all. Parents do not need coding experience. The important thing is that your child has a supportive environment and a willingness to learn.',
  },
  {
    question: 'How does registration work?',
    answer:
      'Parents can complete the registration form or enrol through a programme page. We follow up with next steps, programme details and support.',
  },
  {
    question: 'How do I pay?',
    answer:
      'Payment options are shared at the time of registration. GemTech keeps this simple, clear and specific to each programme.',
  },
  {
    question: 'What happens after payment?',
    answer:
      'After payment, we send confirmation and onboarding information so families know what to expect before the first class begins.',
  },
  {
    question: 'Do you offer private lessons?',
    answer:
      'Private or small-group support may be available depending on the programme and individual needs. Please contact us to discuss options.',
  },
  {
    question: 'Do you work with schools?',
    answer:
      'Yes. GemTech can potentially work with schools, educational organisations and youth programmes. Please use the partnership page to make an enquiry.',
  },
  {
    question: 'Do you offer holiday programmes?',
    answer:
      'Holiday and intensive programmes may be offered from time to time. The best way to know what is currently available is to contact GemTech.',
  },
  {
    question: 'Do you offer refunds?',
    answer:
      'Refund and cancellation terms are confirmed clearly before enrolment. Families are encouraged to review details before completing payment.',
  },
  {
    question: 'How can I contact GemTech?',
    answer:
      'You can reach us by email, WhatsApp, Instagram or by using the contact form on the website. We are happy to answer questions about programmes and enrolment.',
  },
]

const ageGroups = [
  {
    title: 'Explorers',
    age: 'Ages 7-9',
    description: 'Younger learners discovering technology through creative activities and guided exploration.',
  },
  {
    title: 'Builders',
    age: 'Ages 10-12',
    description: 'Children developing their first serious coding and technology projects with confidence.',
  },
  {
    title: 'Creators',
    age: 'Ages 13-16',
    description: 'Teenagers building stronger programming, digital literacy and technology skills.',
  },
]

const trustHighlights = [
  'Project-based learning',
  'Live instructor-led classes',
  'Designed for children & teens',
  'Online-first',
  'Small-group learning',
]

const projectCards = [
  {
    title: 'Mini games',
    image:
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Simple apps',
    image:
      'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Interactive programs',
    image:
      'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Animations',
    image:
      'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Websites',
    image:
      'https://images.unsplash.com/photo-1522204523234-8729aa6e3d5f?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Automation projects',
    image:
      'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=900&q=80',
  },
]

const principles = [
  'Learn by doing',
  'Age-appropriate teaching',
  'Projects over memorisation',
  'Real instructor guidance',
  'Confidence matters',
  'Technology beyond the classroom',
]

const testimonials = [
  {
    name: 'Parent placeholder',
    age: 'Child age: TBC',
    programme: 'Programme: TBC',
    quote:
      'A placeholder for a real parent testimonial once the first cohort has completed their learning journey.',
  },
  {
    name: 'Parent placeholder',
    age: 'Child age: TBC',
    programme: 'Programme: TBC',
    quote:
      'This testimonial space is ready for authentic feedback from learners and families after programme delivery begins.',
  },
]

function usePageMeta(title, description) {
  useEffect(() => {
    document.title = title
    const metaDescription = document.querySelector('meta[name="description"]')
    if (metaDescription) metaDescription.setAttribute('content', description)
  }, [title, description])
}

function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.replace('#', ''))
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' })
        return
      }
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [pathname, hash])

  return null
}

function SectionHeading({ eyebrow, title, text, align = 'left' }) {
  return (
    <div className={`section-heading ${align}`}>
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <h2>{title}</h2>
      {text && <p>{text}</p>}
    </div>
  )
}

function ProgrammeCard({ programme }) {
  return (
    <article className="programme-card">
      <div className="programme-topline">
        <span className="programme-badge">{programme.badge}</span>
        <span className="programme-format">{programme.format}</span>
      </div>
      <h3>{programme.name}</h3>
      <div className="programme-meta">
        <span>Age: {programme.ageRange}</span>
        <span>Level: {programme.level}</span>
        <span>Duration: {programme.duration}</span>
      </div>
      <p>{programme.description}</p>
      <div className="programme-outcomes">
        {programme.outcomes.slice(0, 4).map((item) => (
          <span key={item}>{item}</span>
        ))}
      </div>
      <div className="card-actions">
        <Link to={`/programmes/${programme.slug}`} className="button secondary-button">
          View Programme
        </Link>
      </div>
    </article>
  )
}

function ProgrammesGrid({ compact = false }) {
  const list = compact ? programmes.slice(0, 3) : programmes

  return (
    <div className="programme-grid">
      {list.map((programme) => (
        <ProgrammeCard key={programme.id} programme={programme} />
      ))}
    </div>
  )
}

function FaqAccordion({ items }) {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <div className="faq-list">
      {items.map((item, index) => {
        const isOpen = index === openIndex
        return (
          <div key={item.question} className={`faq-item ${isOpen ? 'open' : ''}`}>
            <button
              type="button"
              className="faq-question"
              onClick={() => setOpenIndex(isOpen ? -1 : index)}
              aria-expanded={isOpen}
            >
              <span>{item.question}</span>
              <span className="faq-icon">{isOpen ? '−' : '+'}</span>
            </button>
            {isOpen && <div className="faq-answer">{item.answer}</div>}
          </div>
        )
      })}
    </div>
  )
}

function RegistrationForm() {
  function handleSubmit(event) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const message = [
      'Hello GemTech, I would like to register.',
      `Parent/Guardian: ${formData.get('guardianName')}`,
      `Phone/WhatsApp: ${formData.get('phone')}`,
      `Child: ${formData.get('childName')}`,
      `Child's age: ${formData.get('childAge')}`,
      `Programme: ${formData.get('programme')}`,
    ].join('\n')
    window.location.assign(`${WHATSAPP_URL}?text=${encodeURIComponent(message)}`)
  }

  return (
    <form className="registration-form" onSubmit={handleSubmit}>
      <div className="form-grid">
        <label>
          Parent/Guardian Name
          <input type="text" name="guardianName" placeholder="Your name" required />
        </label>
        <label>
          Phone/WhatsApp
          <input type="tel" name="phone" placeholder="Your phone number" required />
        </label>
        <label>
          Child’s Name
          <input type="text" name="childName" placeholder="Child’s name" required />
        </label>
        <label>
          Child’s Age
          <input type="number" name="childAge" min="1" max="18" placeholder="e.g. 12" required />
        </label>
        <label>
          Programme
          <select name="programme" defaultValue="" required>
            <option value="" disabled>
              Select a programme
            </option>
            {programmes.map((programme) => (
              <option key={programme.id} value={programme.name}>
                {programme.name}
              </option>
            ))}
          </select>
        </label>
      </div>
      <p className="form-note">
        Your details will be added to a WhatsApp message for GemTech. Please review and send it in
        WhatsApp to complete your registration enquiry.
      </p>
      <button type="submit" className="button primary-button full-width-button">
        Continue on WhatsApp
      </button>
    </form>
  )
}

function ContactForm() {
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(event) {
    event.preventDefault()
    setSubmitted(true)
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      {submitted ? (
        <div className="form-success">Your message has been sent. We’ll be in touch soon.</div>
      ) : (
        <>
          <div className="form-grid">
            <label>
              Name
              <input type="text" name="name" required />
            </label>
            <label>
              Email
              <input type="email" name="email" required />
            </label>
            <label>
              Phone/WhatsApp
              <input type="tel" name="phone" />
            </label>
            <label>
              Enquiry Type
              <select name="reason" defaultValue="">
                <option value="" disabled>
                  Select one
                </option>
                <option value="Programme enquiry">Programme enquiry</option>
                <option value="General question">General question</option>
                <option value="Partnership">Partnership</option>
              </select>
            </label>
            <label className="full-width">
              Message
              <textarea name="message" rows="5" placeholder="Tell us how we can help" required />
            </label>
          </div>
          <button type="submit" className="button primary-button">
            Send Message
          </button>
        </>
      )}
    </form>
  )
}

function PartnershipForm() {
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(event) {
    event.preventDefault()
    setSubmitted(true)
  }

  return (
    <form className="partnership-form" onSubmit={handleSubmit}>
      {submitted ? (
        <div className="form-success">
          Thanks for reaching out. We’ll respond with next steps for a partnership conversation.
        </div>
      ) : (
        <>
          <div className="form-grid two-column">
            <label>
              Organisation Name
              <input type="text" name="org" required />
            </label>
            <label>
              Contact Name
              <input type="text" name="contact" required />
            </label>
            <label>
              Email
              <input type="email" name="email" required />
            </label>
            <label>
              Phone
              <input type="tel" name="phone" />
            </label>
            <label>
              Type of Partnership
              <select name="partnershipType" defaultValue="">
                <option value="" disabled>
                  Select one
                </option>
                <option value="School">School</option>
                <option value="NGO">NGO</option>
                <option value="Corporate CSR">Corporate CSR</option>
                <option value="Youth programme">Youth programme</option>
              </select>
            </label>
            <label>
              Programme Need
              <input type="text" name="need" placeholder="Coding workshop, holiday programme, club, etc." />
            </label>
            <label className="full-width">
              Details
              <textarea name="details" rows="5" placeholder="Tell us about your students, goals and timeline" required />
            </label>
          </div>
          <button type="submit" className="button primary-button">
            Partner With GemTech
          </button>
        </>
      )}
    </form>
  )
}

function TestimonialCard({ item }) {
  return (
    <article className="testimonial-card">
      <div className="testimonial-image">Photo</div>
      <div className="testimonial-body">
        <p>“{item.quote}”</p>
        <div className="testimonial-meta">
          <strong>{item.name}</strong>
          <span>{item.age}</span>
          <span>{item.programme}</span>
        </div>
      </div>
    </article>
  )
}

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  const navItems = [
    { label: 'Programmes', to: '/programmes' },
    { label: 'How It Works', to: '/how-it-works' },
    { label: 'About', to: '/about' },
    { label: 'For Parents', to: '/for-parents' },
    { label: 'Partnerships', to: '/partnerships' },
    { label: 'FAQs', to: '/faqs' },
  ]

  return (
    <header className="site-header">
      <div className="container nav-shell">
        <Link to="/" className="brand brand-logo-link" aria-label="GemTech home">
          <img src={logoImage} alt="GemTech logo" className="brand-logo" />
        </Link>

        <nav className={`main-nav ${menuOpen ? 'open' : ''}`} aria-label="Main navigation">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => (isActive ? 'active' : '')}
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="nav-actions">
          <Link to="/programmes" className="button secondary-button desktop-only">
            Explore Programmes
          </Link>
          <Link to="/register" className="button primary-button">
            Register
          </Link>
          <button
            type="button"
            className="mobile-menu-toggle"
            aria-label="Toggle navigation"
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            ☰
          </button>
        </div>
      </div>
    </header>
  )
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <Link to="/" className="brand footer-brand brand-logo-link">
            <img src={logoImage} alt="GemTech logo" className="brand-logo brand-logo-footer" />
          </Link>
          <p className="footer-copy">
            Technology education for the next generation of builders.
          </p>
          <p className="footer-tagline">Technology education for the next generation of builders.</p>
        </div>

        <div>
          <h3>Explore</h3>
          <ul>
            <li>
              <Link to="/programmes">Programmes</Link>
            </li>
            <li>
              <Link to="/for-parents">For Parents</Link>
            </li>
            <li>
              <Link to="/partnerships">Partnerships</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </div>

        <div>
          <h3>Company</h3>
          <ul>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/faqs">FAQs</Link>
            </li>
            <li>
              <Link to="/privacy-policy">Privacy Policy</Link>
            </li>
            <li>
              <Link to="/terms">Terms & Conditions</Link>
            </li>
          </ul>
        </div>

        <div>
          <h3>Connect</h3>
          <ul>
            <li>
              <a href={WHATSAPP_URL} target="_blank" rel="noreferrer">
                WhatsApp
              </a>
            </li>
            <li>
              <a href="mailto:hello@gemtech.academy">Email</a>
            </li>
            <li>
              <a href="https://instagram.com" target="_blank" rel="noreferrer">
                Instagram
              </a>
            </li>
            <li>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer">
                LinkedIn
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© 2026 GemTech. All rights reserved.</span>
      </div>
    </footer>
  )
}

function HomePage() {
  usePageMeta(
    'GemTech | Technology education for children and teens',
    'GemTech helps children and teenagers build practical technology skills through guided, project-based learning in coding, programming and digital technology.',
  )

  return (
    <>
      <main>
        <section className="hero-section">
          <div className="container hero-grid">
            <div className="hero-copy">
              <span className="eyebrow">Technology education for the next generation</span>
              <h1>
                Technology isn’t just something your child should use. It’s something they can learn to create with.
              </h1>
              <p>
                GemTech helps children and teenagers build practical technology skills through guided, project-based learning in coding, programming and digital technology.
              </p>
              <div className="hero-actions">
                <Link to="/programmes" className="button primary-button">
                  Explore Programmes
                </Link>
                <Link to="/register" className="button secondary-button">
                  Register
                </Link>
              </div>
            </div>
            <div className="hero-visual">
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80"
                alt="African children and teenagers learning together with technology"
              />
            </div>
          </div>
        </section>

        <section className="trust-strip">
          <div className="container trust-grid">
            {trustHighlights.map((item) => (
              <div key={item} className="trust-item">
                {item}
              </div>
            ))}
          </div>
        </section>

        <section className="page-section problem-section">
          <div className="container small-container">
            <SectionHeading
              eyebrow="The problem"
              title="Your child is already spending time with technology. What are they learning to do with it?"
              text="Technology can either be something children consume passively or something they learn to understand, create with and solve problems with. At GemTech, we aim to help young people move beyond screens and into practical digital confidence."
            />
          </div>
        </section>

        <section className="page-section light-section">
          <div className="container">
            <SectionHeading
              eyebrow="What GemTech teaches"
              title="Practical technology learning that matches how young people actually learn."
              text="Each area below is taught in a way that builds confidence, curiosity and useful skills children can carry beyond the classroom."
            />
            <div className="learning-grid">
              {learningAreas.map((item) => (
                <div key={item.title} className="learning-card">
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="page-section">
          <div className="container">
            <SectionHeading
              eyebrow="Why GemTech"
              title="Technology should feel useful, understandable and exciting."
              text="We teach in a way that helps children build confidence, ask better questions and understand how digital tools actually work."
            />
            <div className="principles-grid">
              {principles.map((principle, index) => (
                <div key={principle} className="principle-item">
                  <span className="step-number">0{index + 1}</span>
                  <h3>{principle}</h3>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="page-section">
          <div className="container">
            <SectionHeading
              eyebrow="Programmes"
              title="Structured learning that grows with your child."
              text="Each programme is designed to be practical, supportive and age-aware, so learners can build real skills step by step."
            />
            <ProgrammesGrid compact />
          </div>
        </section>

        <section className="page-section build-section">
          <div className="container">
            <SectionHeading
              eyebrow="What your child will build"
              title="We don't want students to leave saying, 'I attended a coding class.' We want them to leave saying, 'Look what I made.'"
            />
            <div className="project-grid">
              {projectCards.map((card) => (
                <div key={card.title} className="project-card">
                  <img src={card.image} alt={card.title} />
                  <div className="project-label">{card.title}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="page-section light-section">
          <div className="container">
            <SectionHeading
              eyebrow="How it works"
              title="A clear path from first sign-up to real project-making."
            />
            <div className="timeline">
              <div className="timeline-step">
                <span>01</span>
                <h3>Choose a programme</h3>
                <p>Find a programme that matches your child’s age and experience.</p>
              </div>
              <div className="timeline-step">
                <span>02</span>
                <h3>Register</h3>
                <p>Complete the enrolment form and share the basics with our team.</p>
              </div>
              <div className="timeline-step">
                <span>03</span>
                <h3>Learn</h3>
                <p>Attend live instructor-led sessions and work through practical projects.</p>
              </div>
              <div className="timeline-step">
                <span>04</span>
                <h3>Build</h3>
                <p>Your child applies what they learn by creating their own projects.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="page-section value-section">
          <div className="container two-column-layout">
            <div>
              <SectionHeading
                eyebrow="For parents"
                title="What does my child actually get?"
              />
              <ul className="feature-list">
                <li>Live classes</li>
                <li>Structured curriculum</li>
                <li>Practical projects</li>
                <li>Instructor guidance</li>
                <li>Learning resources</li>
                <li>Progress and feedback where applicable</li>
                <li>Community and support where applicable</li>
              </ul>
            </div>
            <div className="parent-card">
              <h3>What parents need</h3>
              <ul className="simple-list">
                <li>Laptop or computer</li>
                <li>Stable internet connection</li>
                <li>Quiet learning environment</li>
                <li>Any required software</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="page-section light-section">
          <div className="container">
            <SectionHeading
              eyebrow="Age groups"
              title="Support that matches a child’s stage of learning."
            />
            <div className="age-grid">
              {ageGroups.map((group) => (
                <div key={group.title} className="age-card">
                  <span className="age-tag">{group.age}</span>
                  <h3>{group.title}</h3>
                  <p>{group.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="page-section founder-section">
          <div className="container founder-grid">
            <div className="founder-photo">
              <div className="photo-placeholder">Founder photo</div>
            </div>
            <div className="founder-content">
              <SectionHeading
                eyebrow="About GemTech"
                title="A learning experience built around real understanding."
              />
              <p>
                I’ve seen what happens when children are given the opportunity to understand technology instead of simply consume it. GemTech exists to make that learning practical, exciting and genuinely useful.
              </p>
              <div className="founder-block">
                <h3>MaryKate Hadassah Ekanem</h3>
                <p>
                  Founder, educator and technology learner. MaryKate brings a mix of computer science understanding, technology education experience and a strong belief that children deserve meaningful, age-appropriate digital learning.
                </p>
              </div>
              <Link to="/about" className="button secondary-button">
                Meet the Founder
              </Link>
            </div>
          </div>
        </section>

        <section className="page-section">
          <div className="container">
            <SectionHeading
              eyebrow="Results / social proof"
              title="What our learners and parents will say next."
              text="This space is ready for feedback from families once real testimonials are available."
            />
            <div className="testimonial-grid">
              {testimonials.map((item) => (
                <TestimonialCard key={item.name} item={item} />
              ))}
            </div>
          </div>
        </section>

        <section className="page-section faq-section light-section">
          <div className="container narrow-container">
            <SectionHeading
              eyebrow="FAQs"
              title="Common questions from parents."
            />
            <FaqAccordion items={faqs.slice(0, 5)} />
          </div>
        </section>

        <section className="page-section final-cta-section">
          <div className="container cta-panel">
            <div>
              <span className="eyebrow">Ready when you are</span>
              <h2>Ready to see what your child can build?</h2>
            </div>
            <div className="cta-actions">
              <Link to="/programmes" className="button secondary-button">
                Explore Programmes
              </Link>
              <Link to="/register" className="button primary-button">
                Register
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}

function AboutPage() {
  usePageMeta('About GemTech', 'Learn about GemTech, the founder’s perspective and the philosophy behind the academy.')

  return (
    <main className="inner-page">
      <section className="page-section">
        <div className="container narrow-container">
          <SectionHeading
            eyebrow="About GemTech"
            title="A technology academy shaped by real teaching and thoughtful guidance."
            text="GemTech was created for children and teenagers who deserve more than passive screen time. The goal is to help them understand technology, gain confidence with it and use it in ways that are practical, creative and future-ready."
          />
        </div>
      </section>

      <section className="page-section light-section">
        <div className="container founder-grid">
          <div className="founder-photo large-photo">
            <div className="photo-placeholder">Founder portrait</div>
          </div>
          <div className="founder-content">
            <span className="eyebrow">Founder</span>
            <h2>MaryKate Hadassah Ekanem</h2>
            <p>
              I’ve seen what happens when children are given the opportunity to understand technology instead of simply consume it. Some become curious, some become confident, and some begin to notice that technology is not magic—it is a tool they can learn to use and shape.
            </p>
            <p>
              GemTech grew out of that need: a supportive place for children and teenagers to learn technology in ways that are practical, age-appropriate and motivating. The focus is on clear teaching, thoughtful guidance and meaningful projects that help learners build real understanding.
            </p>
            <Link to="/contact" className="button primary-button">
              Meet the Founder
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}

function ProgrammesPage() {
  usePageMeta('Programmes | GemTech', 'Explore GemTech programmes for children and teenagers in coding, Python and creative digital technology.')

  return (
    <main className="inner-page">
      <section className="page-section">
        <div className="container">
          <SectionHeading
            eyebrow="Programmes"
            title="Learning that is practical, age-aware and encouraging."
            text="Every programme is designed to help children build confidence with technology by making things, understanding ideas and solving problems along the way."
          />
          <ProgrammesGrid />
        </div>
      </section>

      <section className="page-section light-section">
        <div className="container narrow-container">
          <SectionHeading
            eyebrow="Pricing"
            title="Programme details are shared clearly before enrolment."
            text="GemTech keeps pricing transparent and easy to update. If a programme does not currently have a public price, it will show contact information for current details."
          />
          <div className="pricing-list">
            {programmes.map((programme) => (
              <div key={programme.id} className="pricing-card">
                <h3>{programme.name}</h3>
                <div className="pricing-row">
                  <span>Fee</span>
                  <strong>{programme.price}</strong>
                </div>
                <div className="pricing-row">
                  <span>Duration</span>
                  <strong>{programme.duration}</strong>
                </div>
                <div className="pricing-row">
                  <span>Format</span>
                  <strong>{programme.format}</strong>
                </div>
                <div className="pricing-row">
                  <span>Sessions</span>
                  <strong>Contact us</strong>
                </div>
                <ul>
                  <li>Live learning sessions</li>
                  <li>Project-based guidance</li>
                  <li>Supportive instructor feedback</li>
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}

function ProgrammeDetailPage() {
  const { slug } = useParams()
  const programme = programmes.find((item) => item.slug === slug) || programmes[0]

  usePageMeta(
    `${programme.name} | GemTech`,
    `${programme.description} Explore the age range, learning outcomes and practical projects for this GemTech programme.`,
  )

  return (
    <main className="inner-page">
      <section className="page-section">
        <div className="container programme-detail-shell">
          <div className="programme-hero-box">
            <span className="programme-badge">{programme.badge}</span>
            <h1>{programme.name}</h1>
            <p>{programme.summary}</p>
            <div className="programme-meta detail-meta">
              <span>Age: {programme.ageRange}</span>
              <span>Level: {programme.level}</span>
              <span>Duration: {programme.duration}</span>
              <span>Format: {programme.format}</span>
            </div>
            <div className="feature-buttons">
              <Link to="/register" className="button primary-button">
                Enrol Your Child
              </Link>
              <Link to="/programmes" className="button secondary-button">
                Back to Programmes
              </Link>
            </div>
          </div>

          <div className="programme-detail-panel">
            <h2>What students will build</h2>
            <p>{programme.projectPreview}</p>
            <ul className="detail-list">
              {programme.outcomes.map((outcome) => (
                <li key={outcome}>{outcome}</li>
              ))}
            </ul>
            <div className="detail-price-box">
              <strong>Programme fee</strong>
              <span>{programme.price}</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

function HowItWorksPage() {
  usePageMeta('How It Works | GemTech', 'See how GemTech helps young learners move from choosing a programme to building real projects with confidence.')

  return (
    <main className="inner-page">
      <section className="page-section">
        <div className="container">
          <SectionHeading
            eyebrow="How it works"
            title="A simple, supportive learning journey."
          />
          <div className="timeline large-timeline">
            <div className="timeline-step">
              <span>01</span>
              <h3>Choose a programme</h3>
              <p>Find a programme that matches your child’s age and experience.</p>
            </div>
            <div className="timeline-step">
              <span>02</span>
              <h3>Register</h3>
              <p>Complete the enrolment form and share the details we need to support your child.</p>
            </div>
            <div className="timeline-step">
              <span>03</span>
              <h3>Learn</h3>
              <p>Attend live instructor-led sessions and work through practical projects with guidance.</p>
            </div>
            <div className="timeline-step">
              <span>04</span>
              <h3>Build</h3>
              <p>Your child applies what they learn by creating their own projects and reflecting on the process.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

function ForParentsPage() {
  usePageMeta('For Parents | GemTech', 'Learn what your child will receive in a GemTech programme and what families need to prepare at home.')

  return (
    <main className="inner-page">
      <section className="page-section">
        <div className="container two-column-layout">
          <div>
            <SectionHeading
              eyebrow="For parents"
              title="What does my child actually get?"
            />
            <ul className="feature-list">
              <li>Live classes</li>
              <li>Structured curriculum</li>
              <li>Practical projects</li>
              <li>Instructor guidance</li>
              <li>Learning resources</li>
              <li>Progress and feedback where applicable</li>
              <li>Community and support where applicable</li>
              <li>Certificate only if offered by the programme</li>
            </ul>
          </div>
          <div className="parent-card">
            <h3>What parents need to provide</h3>
            <ul className="simple-list">
              <li>Laptop or computer</li>
              <li>Stable internet connection</li>
              <li>Quiet learning environment</li>
              <li>Required software and access instructions</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="page-section light-section">
        <div className="container narrow-container">
          <SectionHeading
            eyebrow="Parent value"
            title="You’re not just paying for a coding class."
            text="Parents are investing in practical technology skills, confidence, problem-solving and the ability to use digital tools responsibly and creatively."
          />
          <div className="value-badges">
            <span>Problem-solving</span>
            <span>Confidence</span>
            <span>Creativity</span>
            <span>Logical thinking</span>
            <span>Digital literacy</span>
            <span>Practical technology skills</span>
          </div>
        </div>
      </section>
    </main>
  )
}

function FaqPage() {
  usePageMeta('FAQs | GemTech', 'Frequently asked questions for parents about GemTech programmes, sessions and enrolment.')

  return (
    <main className="inner-page">
      <section className="page-section">
        <div className="container narrow-container">
          <SectionHeading
            eyebrow="FAQs"
            title="Questions parents usually ask before enrolling."
          />
          <FaqAccordion items={faqs} />
        </div>
      </section>
    </main>
  )
}

function ContactPage() {
  usePageMeta('Contact GemTech', 'Contact GemTech for programme enquiries, support or partnerships.')

  return (
    <main className="inner-page">
      <section className="page-section">
        <div className="container contact-grid">
          <div>
            <SectionHeading
              eyebrow="Contact"
              title="We’re happy to answer questions."
              text="Whether you’re exploring programmes, checking the next intake or asking about a school partnership, we’d love to hear from you."
            />
            <div className="contact-list">
              <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="contact-link primary-link">
                WhatsApp
              </a>
              <a href="mailto:hello@gemtech.academy" className="contact-link">
                hello@gemtech.academy
              </a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="contact-link">
                Instagram
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="contact-link">
                LinkedIn
              </a>
            </div>
          </div>

          <div className="contact-panel">
            <ContactForm />
          </div>
        </div>
      </section>
    </main>
  )
}

function PartnershipsPage() {
  usePageMeta('Partnerships | GemTech', 'Bring practical technology education to schools, organisations, NGOs and youth programmes with GemTech.')

  return (
    <main className="inner-page">
      <section className="page-section">
        <div className="container partnership-shell">
          <div>
            <SectionHeading
              eyebrow="Partnerships"
              title="Bring practical technology education to your students."
              text="GemTech can work with schools, educational organisations, youth programmes, NGOs and community initiatives to deliver engaging technology learning in ways that feel active, relevant and age-appropriate."
            />
            <div className="partnership-offers">
              <span>Coding workshops</span>
              <span>Technology bootcamps</span>
              <span>Holiday programmes</span>
              <span>School technology clubs</span>
              <span>Instructor-led training</span>
              <span>Custom technology programmes</span>
            </div>
            <Link to="/contact" className="button primary-button">
              Partner With GemTech
            </Link>
          </div>

          <div className="partner-form-panel">
            <PartnershipForm />
          </div>
        </div>
      </section>
    </main>
  )
}

function PrivacyPage() {
  usePageMeta('Privacy Policy | GemTech', 'Privacy information for families, learners and partners interacting with GemTech.')

  return (
    <main className="inner-page">
      <section className="page-section">
        <div className="container narrow-container policy-page">
          <SectionHeading eyebrow="Privacy Policy" title="How GemTech handles personal information." />
          <p>
            GemTech is committed to protecting the privacy of families, learners and partners. Information collected through the website and enrolment process is used to support programme communication, onboarding, registration and learner support.
          </p>
          <p>
            We do not collect unnecessary sensitive information. Contact details, learner information and relevant programme preferences are kept limited to what is needed for the purpose of enrolment and communication.
          </p>
          <p>
            Information may be shared only where required for programme delivery, operational support or clear consent from the parent or guardian. Families are welcome to contact GemTech to ask questions about how information is used.
          </p>
        </div>
      </section>
    </main>
  )
}

function TermsPage() {
  usePageMeta('Terms & Conditions | GemTech', 'GemTech terms and conditions for programme enrolment and communication.')

  return (
    <main className="inner-page">
      <section className="page-section">
        <div className="container narrow-container policy-page">
          <SectionHeading eyebrow="Terms & Conditions" title="Programme participation and website information." />
          <p>
            By enrolling in a GemTech programme, families agree to participate in the learning process, attend scheduled classes and communicate clearly with the programme team where support or adjustments are needed.
          </p>
          <p>
            GemTech reserves the right to update programme details, class schedules and delivery arrangements where necessary. Families are encouraged to review programme information carefully before payment or registration.
          </p>
          <p>
            All programme descriptions, learning expectations and timelines are provided as clear guidance. GemTech aims to support learners in a thoughtful and practical way, while maintaining a respectful, safe and age-appropriate learning environment.
          </p>
        </div>
      </section>
    </main>
  )
}

function RegistrationPage() {
  usePageMeta('Register | GemTech', 'Register your child for a GemTech technology programme.')

  return (
    <main className="inner-page">
      <section className="page-section">
        <div className="container narrow-container">
          <SectionHeading
            eyebrow="Registration"
            title="Register your child for a GemTech programme."
            text="Share a few details and continue in WhatsApp to send your registration enquiry directly to our team."
          />
          <RegistrationForm />
        </div>
      </section>
    </main>
  )
}

function App() {
  return (
    <div className="app-shell">
      <Navbar />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/programmes" element={<ProgrammesPage />} />
        <Route path="/programmes/:slug" element={<ProgrammeDetailPage />} />
        <Route path="/how-it-works" element={<HowItWorksPage />} />
        <Route path="/for-parents" element={<ForParentsPage />} />
        <Route path="/faqs" element={<FaqPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/partnerships" element={<PartnershipsPage />} />
        <Route path="/privacy-policy" element={<PrivacyPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/waitlist" element={<Navigate to="/register" replace />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Footer />

      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noreferrer"
        className="floating-whatsapp"
        aria-label="Chat on WhatsApp"
      >
        WhatsApp
      </a>

      <div className="mobile-cta-bar">
        <Link to="/register" className="button primary-button">
          Register
        </Link>
      </div>
    </div>
  )
}

export default App
