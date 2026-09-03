import vestockImage from '@/assets/elements/vestock.webp'
import ecolinkImage from '@/assets/animations/ecolink.webm'
import ecolinkThumbnail from '@/assets/animations/ecolink-thumb.webp'
import chatbotImage from '@/assets/elements/chatbot.webp'
import kinectImage from '@/assets/animations/kinect-galery.webm'
import kinectThumbnail from '@/assets/animations/kinect-galery-thumb.webp'
import carAutoCenterImage from '@/assets/animations/carautocenter.webm'
import carAutoCenterThumbnail from '@/assets/animations/carautocenter-thumb.webp'
import yumeImage from '@/assets/animations/yume.webm'
import yumeThumbnail from '@/assets/animations/yume-thumb.webp'
import diarioDoCarroEletricoImage from '@/assets/animations/diariodocarroeletrico.webm'
import diarioDoCarroEletricoThumbnail from '@/assets/animations/diariodocarroeletrico-thumb.webp'

export interface Project {
  id: string
  track: number
  title: string
  subtitle: string
  description: string
  image: string
  thumbnail?: string
  mediaType: 'image' | 'video'
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
    mediaType: 'image',
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
    thumbnail: ecolinkThumbnail,
    mediaType: 'video',
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
    mediaType: 'image',
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
    thumbnail: kinectThumbnail,
    mediaType: 'video',
    technologies: ['Vue.js', 'SCSS', 'JavaScript'],
    github: 'https://github.com/askuovye/projetofinal',
    category: 'Frontend Experience',
    year: '2026',
    duration: '03:41',
    durationSeconds: 221,
  },
  {
    id: 'br-car-auto-center',
    track: 5,
    title: 'BR Car Auto Center',
    subtitle: 'Site institucional para oficina automotiva',
    description: 'Apresenta serviços automotivos, avaliações, localização e canais de contato para facilitar agendamentos.',
    image: carAutoCenterImage,
    thumbnail: carAutoCenterThumbnail,
    mediaType: 'video',
    technologies: ['Web Design', 'Responsivo', 'UI/UX'],
    live: 'https://brcarautocenter.com.br/',
    category: 'Automotive Website',
    year: '2026',
    duration: '03:12',
    durationSeconds: 192,
  },
  {
    id: 'yume-saude',
    track: 6,
    title: 'Yume Saúde',
    subtitle: 'Site institucional para clínica infantil',
    description: 'Apresenta serviços de pediatria, fonoaudiologia e saúde auditiva com acesso direto ao agendamento de consultas.',
    image: yumeImage,
    thumbnail: yumeThumbnail,
    mediaType: 'video',
    technologies: ['Web Design', 'Responsivo', 'UI/UX'],
    live: 'https://yumesaude.com.br/',
    category: 'Healthcare Website',
    year: '2026',
    duration: '03:18',
    durationSeconds: 198,
  },
  {
    id: 'diario-do-carro-eletrico',
    track: 7,
    title: 'Diário do Carro Elétrico',
    subtitle: 'Portal especializado em mobilidade elétrica',
    description: 'Reúne testes reais, notícias e conteúdos sobre autonomia, recarga, custos e viagens com carros elétricos.',
    image: diarioDoCarroEletricoImage,
    thumbnail: diarioDoCarroEletricoThumbnail,
    mediaType: 'video',
    technologies: ['Web Design', 'Responsivo', 'UI/UX'],
    live: 'https://diariodocarroeletrico.com.br/',
    category: 'Electric Mobility Portal',
    year: '2026',
    duration: '03:24',
    durationSeconds: 204,
  },
]
