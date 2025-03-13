import { Product } from '../types/store';

// بيانات المنتجات النموذجية للمتجر
export const products: Product[] = [
  {
    id: '1',
    name: 'سماعات لاسلكية بلوتوث',
    price: 29.990,
    image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    category: 'إلكترونيات',
    featured: true,
    description: 'سماعات لاسلكية فاخرة مع تقنية البلوتوث 5.0، عازلة للضوضاء وجودة صوت ممتازة. تأتي مع علبة شحن تدوم لمدة 24 ساعة من الاستماع.',
    images: [
      'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    ],
    sku: 'HDPHN-001',
    stock: 45,
    attributes: {
      اللون: 'أسود',
      الوزن: '45 جرام',
      'عمر البطارية': '8 ساعات',
      'النطاق': '10 متر',
    },
    rating: 4.8,
    reviews: [
      {
        id: '1',
        userName: 'أحمد محمد',
        rating: 5,
        comment: 'جودة صوت رائعة وعزل ممتاز للضوضاء، أنصح بها بشدة!',
        date: '2023-11-15',
      },
      {
        id: '2',
        userName: 'سارة العلي',
        rating: 4,
        comment: 'منتج ممتاز، البطارية تدوم طويلاً لكن العلبة كبيرة قليلاً.',
        date: '2023-10-28',
      },
    ],
  },
  {
    id: '2',
    name: 'حقيبة ظهر عصرية',
    price: 49.990,
    image: 'https://images.unsplash.com/photo-1491637639811-60e2756cc1c7?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    category: 'حقائب',
    featured: true,
    description: 'حقيبة ظهر عصرية مصنوعة من النايلون عالي الجودة مقاومة للماء. مناسبة للرحلات والاستخدام اليومي مع جيوب متعددة وحماية للكمبيوتر المحمول.',
    images: [
      'https://images.unsplash.com/photo-1491637639811-60e2756cc1c7?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      'https://images.unsplash.com/photo-1547949003-9792a18a2601?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    ],
    sku: 'BKPCK-002',
    stock: 28,
    attributes: {
      اللون: 'أزرق داكن',
      السعة: '25 لتر',
      المواد: 'نايلون مقاوم للماء',
      الأبعاد: '45 × 30 × 15 سم',
    },
    rating: 4.6,
    reviews: [
      {
        id: '1',
        userName: 'محمد العبدالله',
        rating: 5,
        comment: 'حقيبة ممتازة وخامة عالية! تتسع لكل احتياجاتي وتحمي الكمبيوتر جيداً.',
        date: '2023-12-05',
      },
    ],
  },
  {
    id: '3',
    name: 'ساعة ذكية متطورة',
    price: 89.990,
    image: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    category: 'إلكترونيات',
    featured: true,
    description: 'ساعة ذكية مع شاشة AMOLED وتتبع للياقة البدنية ومراقبة معدل ضربات القلب. مقاومة للماء ومتوافقة مع Android و iOS.',
    images: [
      'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    ],
    sku: 'WTCH-003',
    stock: 15,
    attributes: {
      اللون: 'أسود',
      'حجم الشاشة': '1.4 إنش',
      'عمر البطارية': '7 أيام',
      'مقاومة الماء': 'حتى 50 متر',
    },
    rating: 4.7,
    reviews: [
      {
        id: '1',
        userName: 'فهد الخالد',
        rating: 5,
        comment: 'أفضل ساعة ذكية استخدمتها، البطارية تدوم طويلاً وتطبيقاتها ممتازة!',
        date: '2023-11-20',
      },
      {
        id: '2',
        userName: 'نوف السالم',
        rating: 4,
        comment: 'تصميم أنيق وخفيفة الوزن، لكن تستغرق وقتًا للشحن.',
        date: '2023-10-18',
      },
    ],
  },
  {
    id: '4',
    name: 'نظارة شمسية أنيقة',
    price: 35.500,
    image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    category: 'اكسسوارات',
    featured: false,
    description: 'نظارة شمسية بتصميم كلاسيكي وعدسات مستقطبة مع حماية من الأشعة فوق البنفسجية. إطار خفيف الوزن ومتين.',
    images: [
      'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      'https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    ],
    sku: 'SNGL-004',
    stock: 32,
    attributes: {
      اللون: 'أسود',
      المواد: 'أسيتات وستانلس ستيل',
      الحماية: 'UV400',
      النوع: 'للجنسين',
    },
    rating: 4.5,
  },
  {
    id: '5',
    name: 'آيفون 15 برو ماكس',
    price: 399.990,
    image: 'https://images.unsplash.com/photo-1696446701632-4a873b922b80?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    category: 'هواتف ذكية',
    featured: true,
    description: 'آيفون 15 برو ماكس مع معالج A17 Pro وكاميرا بدقة 48 ميجابكسل وشاشة Super Retina XDR. يدعم 5G ويأتي بسعة تخزين 256GB.',
    images: [
      'https://images.unsplash.com/photo-1696446701632-4a873b922b80?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      'https://images.unsplash.com/photo-1592286927505-1def25115669?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      'https://images.unsplash.com/photo-1580910051074-3eb694886505?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    ],
    sku: 'PHNE-005',
    stock: 10,
    attributes: {
      اللون: 'فضي',
      التخزين: '256GB',
      الشاشة: '6.7 إنش',
      المعالج: 'A17 Pro',
    },
    rating: 4.9,
    reviews: [
      {
        id: '1',
        userName: 'عبدالله المطيري',
        rating: 5,
        comment: 'أداء خارق وكاميرا استثنائية! يستحق كل فلس.',
        date: '2023-12-10',
      },
      {
        id: '2',
        userName: 'سارة الحمد',
        rating: 5,
        comment: 'الجهاز مذهل وبطاريته تدوم طوال اليوم.',
        date: '2023-11-30',
      },
      {
        id: '3',
        userName: 'خالد العنزي',
        rating: 4,
        comment: 'ممتاز لكن السعر مرتفع قليلاً مقارنة بالإصدارات السابقة.',
        date: '2023-11-25',
      },
    ],
  },
  {
    id: '6',
    name: 'لوح تزلج خشبي',
    price: 65.000,
    image: 'https://images.unsplash.com/photo-1547447134-cd3f5c716030?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    category: 'رياضة',
    featured: false,
    description: 'لوح تزلج احترافي مصنوع من خشب القيقب عالي الجودة مع عجلات PU وتصميم فني فريد. مناسب للمبتدئين والمحترفين.',
    images: [
      'https://images.unsplash.com/photo-1547447134-cd3f5c716030?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      'https://images.unsplash.com/photo-1531565637446-32307b194362?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    ],
    sku: 'SKTBD-006',
    stock: 18,
    attributes: {
      الطول: '31 إنش',
      العرض: '8 إنش',
      المواد: 'خشب القيقب 7 طبقات',
      'نوع العجلات': 'PU 52mm',
    },
    rating: 4.4,
  },
  {
    id: '7',
    name: 'سلسلة مفاتيح معدنية',
    price: 12.990,
    image: 'https://images.unsplash.com/photo-1542826384-ef195733747c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    category: 'اكسسوارات',
    featured: false,
    description: 'سلسلة مفاتيح أنيقة مصنوعة من الفولاذ المقاوم للصدأ بتصميم بسيط وعصري. هدية مثالية لأي مناسبة.',
    images: [
      'https://images.unsplash.com/photo-1542826384-ef195733747c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      'https://images.unsplash.com/photo-1593085512500-5d55148d6f0d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    ],
    sku: 'KYCHN-007',
    stock: 50,
    attributes: {
      المواد: 'فولاذ مقاوم للصدأ',
      الوزن: '30 جرام',
      الطول: '10 سم',
    },
    rating: 4.2,
  },
  {
    id: '8',
    name: 'لابتوب ماك بوك برو',
    price: 499.990,
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    category: 'إلكترونيات',
    featured: true,
    description: 'ماك بوك برو 16 إنش مع معالج Apple M2 Pro وذاكرة 16GB وتخزين SSD سعة 512GB. شاشة Liquid Retina XDR وبطارية تدوم طوال اليوم.',
    images: [
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    ],
    sku: 'LPTP-008',
    stock: 8,
    attributes: {
      المعالج: 'Apple M2 Pro',
      الذاكرة: '16GB',
      التخزين: 'SSD 512GB',
      الشاشة: '16 إنش Liquid Retina XDR',
    },
    rating: 4.9,
    reviews: [
      {
        id: '1',
        userName: 'أحمد العبدالله',
        rating: 5,
        comment: 'أداء خارق للبرامج الثقيلة والتصميم، بطارية ممتازة أيضاً.',
        date: '2023-12-15',
      },
      {
        id: '2',
        userName: 'سارة المهنا',
        rating: 5,
        comment: 'أفضل لابتوب استخدمته على الإطلاق. سريع وخفيف ويدوم طويلاً.',
        date: '2023-11-28',
      },
    ],
  },
];

export const categories = [
  'الكل',
  'إلكترونيات',
  'حقائب',
  'اكسسوارات',
  'هواتف ذكية',
  'رياضة',
];

// Update the getProductById function to handle string IDs
export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};

// Update the getRelatedProducts function to handle string IDs
export const getRelatedProducts = (category: string, currentId: string): Product[] => {
  return products
    .filter(product => product.category === category && product.id !== currentId)
    .slice(0, 4);
};
