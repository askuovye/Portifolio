import vestockImage from '@/assets/elements/vestock.png'
import ecolinkImage from '@/assets/animations/ecolink.gif'
import chatbotImage from '@/assets/elements/chatbot.jpeg'
import kinectImage from '@/assets/animations/kinect-galery.gif'

export interface Project {
  id: string
  track: number
  title: string
  subtitle: string
  description: string
  image: string
  technologies: string[]
  github?: string
  live?: string
  category: string
  year: string
  duration: string
  durationSeconds: number
}

export const projects: Project[] = [
  {
    id: 'vestock',
    track: 1,
    title: 'Vestock',
    subtitle: 'Sistema de gestão econômica para brechós',
    description: 'Controle de peças, consignações e fluxo financeiro para reduzir erros e identificar a margem real de cada peça.',
    image: vestockImage,
    technologies: ['Vue.js', 'Laravel', 'PostgreSQL'],
    github: 'https://github.com/askuovye/vestock-api',
    category: 'Full Stack Application',
    year: '2026',
    duration: '03:26',
    durationSeconds: 206,
  },
  {
    id: 'ecolink',
    track: 2,
    title: 'EcoLink',
    subtitle: 'Plataforma comunitária de sustentabilidade',
    description: 'Conecta pessoas a pontos de coleta próximos e orienta o descarte apropriado de resíduos por meio de uma experiência baseada em mapas.',
    image: ecolinkImage,
    technologies: ['Laravel', 'Flutter', 'MySQL'],
    github: 'https://github.com/askuovye/EcoLink',
    category: 'Sustainability Platform',
    year: '2025',
    duration: '03:47',
    durationSeconds: 227,
  },
  {
    id: 'chatbot-langchain',
    track: 3,
    title: 'Chatbot Langchain',
    subtitle: 'Chatbot de perguntas e respostas',
    description: 'Assistente em Python que utiliza LangChain e a API da Groq para responder perguntas em uma interface conversacional direta.',
    image: chatbotImage,
    technologies: ['Python', 'LangChain', 'Groq API'],
    github: 'https://github.com/askuovye/ChatbotLangchain',
    category: 'Artificial Intelligence',
    year: '2025',
    duration: '02:58',
    durationSeconds: 178,
  },
  {
    id: 'kinect-gallery',
    track: 4,
    title: 'Kinect Galery',
    subtitle: 'Galeria social com transições visuais',
    description: 'Rede social inspirada no Instagram e no DeviantArt, criada como projeto final do curso de Frontend da CodeAcademy 3C.',
    image: kinectImage,
    technologies: ['Vue.js', 'SCSS', 'JavaScript'],
    github: 'https://github.com/askuovye/projetofinal',
    category: 'Frontend Experience',
    year: '2026',
    duration: '03:41',
    durationSeconds: 221,
  },
]
