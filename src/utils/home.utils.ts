import SectionCode from '../../assets/code-section.svg';
import IntelligentImage from '../../assets/intelligent.svg';
import CodeImage from '../../assets/code.svg';
import Customization from '../../assets/customization.svg';
import File from '../../assets/file.svg';
import Development from '../../assets/development.svg';
import Agile from '../../assets/agile.svg';
import Detection from '../../assets/detection.svg';
import Security from '../../assets/security.svg';
import Privacy from '../../assets/privacy.svg';

const Features = [
    {
      id: 'feature',
      title: 'Intelligent Automation',
      image: SectionCode,
      sectionTitle: 'Automation and Efficiency',
      sectionDescription: 'Automate Django reference guide creation to save time and enhance project efficiency.',
      cards: [
        {
          image: IntelligentImage,
          leftTitle: 'Intelligent Automation for',
          mainTitle: 'DRF',
          rightTitle: 'Development',
          description: 'Maximize efficiency in your backend projects with automatically generated, Django-specific reference guides.'
        },
        {
          image: CodeImage,
          leftTitle: 'Know Your',
          mainTitle: 'Code',
          rightTitle: 'Base',
          description: 'Access precise and up-to-date information about your Django code base, saving time on manual searching and analysis.'
        }
      ]
    },
    {
      id: 'feature2',
      title: 'Intelligent Automation',
      image: Customization,
      sectionTitle: 'Customization and Relevance',
      sectionDescription: 'Get tailored, up-to-date Django documentation that meets specific project needs.',
      cards: [
        {
          image: File,
          leftTitle: 'Customized and Current',
          mainTitle: 'Documentation',
          rightTitle: '',
          description: 'Obtain reference guides tailored to your specific needs, consistently updated with the latest Django practices and standards.'
        }
      ]
    },
    {
      id: 'feature3',
      title: 'Intelligent Automation',
      image: Development,
      sectionTitle: 'Development and Productivity',
      sectionDescription: 'Focus on critical development aspects with automated logic writing and error resolution.',
      cards: [
        {
          image: Agile,
          leftTitle: 'Agile and Effective',
          mainTitle: 'Development',
          rightTitle: '',
          description: 'Maintain focus on crucial aspects of development, with the system handling low-level logic writing.'
        },
        {
          image: Detection,
          leftTitle: 'Error',
          mainTitle: 'Detection',
          rightTitle: 'and Correction',
          description: 'The system analyzes your code for errors, assisting in quick identification and resolution of issues.'
        }
      ]
    },
    {
      id: 'feature4',
      title: 'Intelligent Automation',
      image: Security,
      sectionTitle: 'Security and Privacy',
      sectionDescription: 'Ensure code privacy with no data storage on servers or logs in privacy mode.',
      cards: [
        {
          image: Privacy,
          leftTitle: 'Guaranteed',
          mainTitle: 'Privacy',
          rightTitle: '',
          description: 'Ensures the privacy of your code; the privacy mode ensures no storage of code data on servers or logs.'
        }
      ]
    }
  ];

  export default Features;