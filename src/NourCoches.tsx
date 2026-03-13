import { useEffect, useRef, useState } from 'react';
import { Instagram, Facebook } from 'lucide-react';
import logo from './assets/logo.png';
import g63Image from './assets/g63.png';


const TRANSLATIONS = {
    ar: {
        dir: 'rtl',
        font: "'Cairo', sans-serif",
        nav: { fleet: 'الأسطول', blog: 'المدونة', services: 'الخدمات', reviews: 'الآراء', contact: 'اتصل بنا', bookNow: '📲 احجز الآن' },
        hero: {
            badge: '⭐⭐⭐⭐⭐ &nbsp;وكالة تأجير سيارات فاخرة وخدمة متميزة · طنجة، المغرب',
            title1: 'استأجر ببساطة.',
            title2: 'أسعار تنافسية، جودة عالية وخدمة مبتكرة.',
            desc: 'في سعدكوشيس، استمتع بأفضل السيارات بأفضل الأسعار. جودة استثنائية وخدمة عملاء مصممة خصيصاً لراحتك أثناء إقامتك في طنجة.',
            ctaBook: '📲 احجز الآن عبر واتساب',
            ctaFleet: 'عرض أسطولنا ←',
            stat1: 'سيارة متوفرة',
            stat2: 'خدمة 24/7',
            stat3: 'تقييم 5.0',
            stat4: 'توصيل للمطار',
            promoBadge: 'عروض حصرية 🔥',
            available: 'متوفر:',
            fuel: 'الوقود:',
            diesel: 'ديزل',
            petrol: 'بنزين'
        },

        promo: {
            banner: '🎁 عرض خاص: انقر لرؤية العروض ({cars}) للإيجار بخصومات تصل إلى 50%!',
            modalTitle: 'سيارات العرض الترويجي',
            modalDesc: 'تستفيد هذه السيارات من خصم خاص يصل إلى 50% عند استئجارها لمدة تزيد عن 5 أيام. اغتنم الفرصة الآن!',
            badge: '🎁 عرض خاص',
            ribbon: 'سيارة يشملها العرض الترويجي! انقر للحجز المخفض.',
        },
        fleet: {
            title: 'أسطولنا',
            subtitle1: 'اختر سيارتك ',
            subtitle2: 'المثالية',
            desc: 'تشكيلة واسعة من أكثر من 50 سيارة متوفرة من علامات متميزة كـ (أودي، رينج روفر، سيات، بيجو، داسيا والمزيد)، مجهزة لضمان الراحة التامة على شوارع طنجة.',
            priceFrom: 'ابتداءً من',
            perDay: 'درهم / يوم',
            book: '📲 احجز السيارة',
            photos: '📷 صور',
            stock: 'متوفر',
            outOfStock: 'نفدت الكمية',
            beforeDiscount: 'درهم / يوم (قبل الخصم)',
            available: 'متوفر:',
            fuelDiesel: 'ديزل',
            fuelPetrol: 'بنزين'
        },

        whyUs: {
            title: 'لماذا نحن؟',
            subtitle1: 'قيادة مبتكرة',
            subtitle2: 'بأفضل الأسعار',
            desc: 'في سعدكوشيس، نقدم لك مزيجاً متكاملاً من السيارات الاستثنائية، الأسعار التنافسية، وخدمة العملاء المبتكرة. كل مركبة في أسطولنا تعكس التزامنا بأعلى معايير الجودة لضمان تجربة لا مثيل لها.',
            cta: 'تواصل معنا 📞',
            cars: 'سيارة متاحة',
            clients: 'عميل سعيد',
            support: 'دعم العملاء',
            rating: 'التقييم العام'
        },
        services: { title: 'خدماتنا', subtitle1: 'خدمة ', subtitle2: 'استثنائية' },
        process: { title: 'كيف تعمل؟', subtitle1: 'عملية بسيطة في ', subtitle2: '3 خطوات' },
        faq: { title: 'الأسئلة الشائعة', subtitle1: 'لديك سؤال؟ ', subtitle2: 'إليك الإجابات' },
        footer: {
            about: 'سعدكوشيس الرائدة في تأجير السيارات الفاخرة والاقتصادية في طنجة. نلتزم بتقديم أفضل تجربة لعملائنا منذ عام 2019.',
            quickLinks: 'روابط سريعة',
            contact: 'معلومات الاتصال',
            rights: 'جميع الحقوق محفوظة'
        },
        cta: {
            title1: 'هل أنت جاهز لتجربة ',
            title2: 'سيارتك',
            title3: '؟',
            desc: 'احجز من خلال الواتساب بضغطة زر. نضمن لك السرعة في الاستجابة والتوصيل المجاني داخل طنجة.',
        },
        contact: {
            title: 'مقرنا',
            subtitle: 'وكالتنا في طنجة',
            address: '📍 Tanger jirrari 1'

        },
        booking: {
            title: 'حجز سيارة',
            name: 'الاسم الكامل',
            namePlh: 'مثلاً: محمد العربي',
            phone: 'رقم الهاتف (واتساب)',
            phonePlh: 'مثلاً: 0612345678',
            days: 'عدد أيام الإيجار',
            total: 'المبلغ الإجمالي التقريبي',
            submit: 'إرسال الطلب عبر واتساب 🚀',
            error: 'يرجى ملء جميع الخانات',
            whatsapp: "مرحباً تانجيرينو كار!\n\nأود حجز سيارة: {car}\nالاسم الكامل: {name}\nرقم الهاتف: {phone}\nتاريخ الاستلام: {startDate}\nتاريخ الإرجاع: {endDate}\nمدة الإيجار: {days} يوم\nالمبلغ الإجمالي: {price} درهم\n\nبانتظار تأكيدكم.",
            generic: 'طلب حجز عام (تواصل معي)',
            startDate: 'تاريخ الاستلام',
            endDate: 'تاريخ الإرجاع (تلقائي)',
            daysLabel: 'عدد الأيام'
        }
    },

    fr: {
        dir: 'ltr',
        font: "'Inter', sans-serif",
        nav: { fleet: 'Flotte', blog: 'Blog', services: 'Services', reviews: 'Avis', contact: 'Contact', bookNow: '📲 Réserver' },
        hero: {
            badge: '⭐⭐⭐⭐⭐ &nbsp;Location de voitures de luxe & service client exceptionnel · Tanger, Maroc',
            title1: 'Louez simplement.',
            title2: 'Prix Imbattables, Qualité Irréprochable & Service Innovant.',
            desc: 'Chez Saadcoches, profitez des meilleures voitures au meilleur prix. Une qualité exceptionnelle et un service client sur-mesure pour votre séjour à Tanger.',
            ctaBook: '📲 Réserver via WhatsApp',
            ctaFleet: 'Voir notre flotte ←',
            stat1: 'Voitures dispos',
            stat2: 'Service 24/7',
            stat3: 'Note 5.0 ⭐',
            stat4: 'Livraison Aéroport',
            promoBadge: 'OFFRES EXCLUSIVES 🔥',
            available: 'Dispo:',
            fuel: 'Carburant:',
            diesel: 'Diesel',
            petrol: 'Essence'
        },

        promo: {
            banner: '🎁 Offre spéciale: Cliquez pour voir les offres ({cars}) avec jusqu\'à 50% de réduction!',
            modalTitle: 'Véhicules en Promotion',
            modalDesc: "Ces véhicules bénéficient d'une réduction spéciale allant jusqu'à 50% pour les locations de plus de 5 jours.",
            badge: '🎁 OFFRE SPÉCIALE',
            ribbon: 'Véhicule en promotion! Cliquez pour réserver à prix réduit.',
        },
        fleet: {
            title: 'NOTRE FLOTTE',
            subtitle1: 'Choisissez votre voiture ',
            subtitle2: 'Idéale',
            desc: 'Large choix de plus de 50 véhicules disponibles parmi des marques premium (Audi, Range Rover, Seat, Peugeot, Dacia...).',
            priceFrom: 'À partir de',
            perDay: 'DH / Jour',
            book: '📲 Réserver',
            photos: '📷 Photos',
            stock: 'Dispo',
            outOfStock: 'Épuisé',
            beforeDiscount: 'DH / Jour (Avant remise)',
            available: 'Dispo:',
            fuelDiesel: 'Diesel',
            fuelPetrol: 'Essence'
        },
        whyUs: {
            title: 'POURQUOI NOUS?',
            subtitle1: 'Innovation &',
            subtitle2: 'Qualité Premium',
            desc: 'Chez Saadcoches, nous redéfinissons la location de voitures avec des véhicules d\'exception à des prix imbattables. Notre service innovant et notre exigence de qualité supérieure vous garantissent une expérience mémorable.',
            cta: 'Contactez-nous 📞',
            cars: 'Voitures dispos',
            clients: 'Clients satisfaits',
            support: 'Support 24/7',
            rating: 'Note globale'
        },
        services: { title: 'NOS SERVICES', subtitle1: 'Service ', subtitle2: 'Exceptionnel' },
        process: { title: 'COMMENT ÇA MARCHE?', subtitle1: 'Processus simple en ', subtitle2: '3 Étapes' },
        faq: { title: 'FAQ', subtitle1: 'Une question? ', subtitle2: 'Nos réponses' },
        footer: {
            about: 'Saadcoches, leader de la location de voitures à Tanger. Engagement qualité et innovation depuis 2019.',
            quickLinks: 'Liens Rapides',
            contact: 'Informations',
            rights: 'Tous droits réservés'
        },
        cta: {
            title1: 'Prêt à choisir votre ',
            title2: 'véhicule',
            title3: ' ?',
            desc: 'Réservez via WhatsApp en un clic. Réponse rapide et livraison gratuite sur Tanger.',
        },
        contact: {
            title: 'NOTRE SIÈGE',
            subtitle: 'Agence à Tanger',
            address: '📍 Tanger jirrari 1'

        },
        booking: {
            title: 'Réserver un véhicule',
            name: 'Nom complet',
            namePlh: 'Ex: Jean Dupont',
            phone: 'Téléphone (WhatsApp)',
            phonePlh: 'Ex: +212 6...',
            days: 'Durée (jours)',
            total: 'Montant total estimé',
            submit: 'Envoyer via WhatsApp 🚀',
            error: 'Veuillez remplir tous les champs',
            whatsapp: "Bonjour Saadcoches !\n\nJe souhaite réserver : {car}\nNom : {name}\nTéléphone : {phone}\nDate de départ : {startDate}\nDate de retour : {endDate}\nDurée : {days} jours\nTotal : {price} DH\n\nEn attente de confirmation.",
            generic: 'Demande de réservation',
            startDate: 'Date de départ',
            endDate: 'Date de retour (auto)',
            daysLabel: 'Durée (jours)'
        }
    },

    en: {
        dir: 'ltr',
        font: "'Inter', sans-serif",
        nav: { fleet: 'Fleet', blog: 'Blog', services: 'Services', reviews: 'Reviews', contact: 'Contact', bookNow: '📲 Book Now' },
        hero: {
            badge: '⭐⭐⭐⭐⭐ &nbsp;Luxury Car Rental & Premier Customer Service · Tangier, Morocco',
            title1: 'Rent simply.',
            title2: 'Unbeatable Prices, Premium Quality & Innovative Service.',
            desc: 'At Saadcoches, experience the best cars at the best rates. Exceptional quality and tailored customer service for your stay in Tangier.',
            ctaBook: '📲 Book via WhatsApp',
            ctaFleet: 'View our fleet ←',
            stat1: 'Cars available',
            stat2: 'Always available',
            stat3: 'Client reviews',
            stat4: 'Airport'
        },
        promo: {
            banner: '🎁 Special Offer: Click to see deals ({cars}) with up to 50% discount!',
            modalTitle: 'Promotional Vehicles',
            modalDesc: 'These vehicles benefit from a special discount of up to 50% for rentals longer than 5 days.',
            badge: '🎁 SPECIAL OFFER',
            ribbon: 'Promotional vehicle! Click for discounted booking.',
        },
        fleet: {
            title: 'OUR FLEET',
            subtitle1: 'Choose your ',
            subtitle2: 'Perfect car',
            desc: 'Wide selection of over 50 vehicles from premium brands (Audi, Range Rover, Seat, Peugeot, Dacia...).',
            priceFrom: 'Starting at',
            perDay: 'DH / Day',
            book: '📲 Book Now',
            photos: '📷 Photos',
            stock: 'In Stock',
            outOfStock: 'Sold Out',
            beforeDiscount: 'DH / Day (Before disc.)'
        },
        whyUs: {
            title: 'WHY US?',
            subtitle1: 'Innovative Drive &',
            subtitle2: 'Premium Quality',
            desc: 'At Saadcoches, we deliver outstanding cars at unbeatable prices, backed by innovative customer service and top-tier quality standards to ensure your journey is perfect.',
            cta: 'Contact Us 📞',
            cars: 'Available cars',
            clients: 'Happy clients',
            support: '24/7 Support',
            rating: 'Overall rating'
        },
        services: { title: 'OUR SERVICES', subtitle1: 'Exceptional ', subtitle2: 'Service' },
        process: { title: 'HOW IT WORKS', subtitle1: 'Simple process in ', subtitle2: '3 Steps' },
        faq: { title: 'FAQ', subtitle1: 'Any questions? ', subtitle2: 'Our answers' },
        footer: {
            about: 'Saadcoches, the leading premium and economy car rental agency in Tangier. Committed to excellence and innovation since 2019.',
            quickLinks: 'Quick Links',
            contact: 'Contact Info',
            rights: 'All rights reserved'
        },
        cta: {
            title1: 'Ready to drive away in your ',
            title2: 'perfect car',
            title3: '?',
            desc: 'Book via WhatsApp in one click. Fast response and free delivery in Tangier.',
        },
        contact: {
            title: 'OUR OFFICE',
            subtitle: 'Agency in Tangier',
            address: '📍 Tanger jirrari 1'

        },
        booking: {
            title: 'Book a Car',
            name: 'Full Name',
            namePlh: 'Ex: John Doe',
            phone: 'Phone Number (WhatsApp)',
            phonePlh: 'Ex: +212 6...',
            days: 'Rental days',
            total: 'Estimated total',
            submit: 'Send via WhatsApp 🚀',
            error: 'Please fill all fields',
            whatsapp: "Hello Saadcoches!\n\nI want to book: {car}\nFull name: {name}\nPhone: {phone}\nStart Date: {startDate}\nEnd Date: {endDate}\nDuration: {days} days\nTotal: {price} DH\n\nWaiting for confirmation.",
            generic: 'General booking request',
            startDate: 'Start Date',
            endDate: 'Return Date (auto)',
            daysLabel: 'Number of days'
        }
    }
};


const SERVICES = [
    {
        icon: '🛫',
        title: { ar: 'توصيل للمطار', fr: 'Transfert Aéroport', en: 'Airport Transfer' },
        desc: { ar: 'سيارتك تنتظرك بمجرد وصولك إلى مطار طنجة ابن بطوطة الدولي.', fr: 'Votre voiture vous attend dès votre arrivée à l\'aéroport Tanger Ibn Battuta.', en: 'Your car awaits you as soon as you arrive at Tangier Ibn Battuta Airport.' }
    },
    {
        icon: '🏠',
        title: { ar: 'توصيل للمنزل أو الفندق', fr: 'Livraison à Domicile', en: 'Home Delivery' },
        desc: { ar: 'نحن نقوم بتوصيل واستلام السيارة من مكانك مباشرة، مجانًا.', fr: 'Nous livrons et récupérons le véhicule directement chez vous, gratuitement.', en: 'We deliver and pick up the vehicle directly at your location, for free.' }
    },
    {
        icon: '📞',
        title: { ar: 'دعم على مدار الساعة 24/7', fr: 'Support 24/7', en: '24/7 Support' },
        desc: { ar: 'فريق متخصص متاح في أي وقت للرد على جميع استفساراتك واحتياجاتك.', fr: 'Une équipe dédiée disponible à tout moment pour répondre à vos besoins.', en: 'A dedicated team available at any time to answer your needs.' }
    },
    {
        icon: '🛡️',
        title: { ar: 'تأمين شامل', fr: 'Assurance Tous Risques', en: 'Full Insurance' },
        desc: { ar: 'جميع سياراتنا مغطاة بتأمين شامل يضمن لك الانطلاق براحة بال وموثوقية.', fr: 'Tous nos véhicules sont couverts par une assurance tous risques pour votre sérénité.', en: 'All our vehicles are covered by full insurance for your peace of mind.' }
    },
    {
        icon: '🧳',
        title: { ar: 'باقات للإيجار الممتد', fr: 'Location Longue Durée', en: 'Long Term Rental' },
        desc: { ar: 'أسعار مميزة وخصومات كبيرة لأي إيجار يتجاوز الأسبوع لتوفير أكبر.', fr: 'Tarifs spéciaux et remises importantes pour les locations de plus d\'une semaine.', en: 'Special rates and significant discounts for rentals over one week.' }
    },
    {
        icon: '🌟',
        title: { ar: 'خدمة كبار الشخصيات VIP', fr: 'Service VIP', en: 'VIP Service' },
        desc: { ar: 'استقبال شخصي استثنائي، سائق خاص، ورحلات نقل عند الطلب لراحة مطلقة.', fr: 'Accueil personnalisé, chauffeur privé et transferts sur demande.', en: 'Personalized welcome, private driver, and transfers on request.' }
    },
];

const TESTIMONIALS = [
    {
        name: { ar: 'كريم ب.', fr: 'Karim B.', en: 'Karim B.' },
        city: { ar: 'الدار البيضاء', fr: 'Casablanca', en: 'Casablanca' },
        stars: 5,
        text: { ar: 'خدمة لا تشوبها شائبة، سيارة الداسيا كانت في حالة ممتازة. التسليم للفندق خلال 20 دقيقة.', fr: 'Service impeccable, la Dacia était en excellent état. Livraison à l\'hôtel en 20 min.', en: 'Impeccable service, the Dacia was in excellent condition. Delivery to the hotel in 20 min.' }
    },
    {
        name: { ar: 'صوفيا م.', fr: 'Sofia M.', en: 'Sofia M.' },
        city: { ar: 'الرباط', fr: 'Rabat', en: 'Rabat' },
        stars: 5,
        text: { ar: 'رينج روفر كانت مذهلة! الأسعار معقولة جداً بالنسبة لجودة الخدمة. تانجيرينو كار وكالة موثوقة حقاً.', fr: 'La Range Rover était magnifique! Prix très corrects pour la qualité.', en: 'The Range Rover was amazing! Prices are very reasonable for the quality.' }
    },
];

const PROCESS = [
    {
        step: '01',
        title: { ar: 'اختر سيارتك', fr: 'Choisissez', en: 'Choose' },
        desc: { ar: 'استكشف أسطولنا المتميز واختر سيارة أحلامك من بين أكثر من 50 سيارة.', fr: 'Explorez notre flotte et choisissez votre voiture de rêve.', en: 'Explore our fleet and choose your dream car.' }
    },
    {
        step: '02',
        title: { ar: 'تواصل معنا', fr: 'Contactez-nous', en: 'Contact Us' },
        desc: { ar: 'راسلنا عبر واتساب لتأكيد التواريخ وحجز سيارتك.', fr: 'Contactez-nous sur WhatsApp pour confirmer les dates.', en: 'Message us on WhatsApp to confirm dates.' }
    },
    {
        step: '03',
        title: { ar: 'استلم المفاتيح', fr: 'Récupérez', en: 'Collect' },
        desc: { ar: 'سنسلمك المفاتيح في المطار أو الفندق. عِش تجربة VIP.', fr: 'Clés remises à l\'aéroport ou à l\'hôtel. Vivez l\'expérience VIP.', en: 'Keys delivered at the airport or hotel. Live the VIP experience.' }
    },
];

const FAQS = [
    {
        q: { ar: 'هل التأمين مشمول في السعر؟', fr: 'L\'assurance est-elle incluse?', en: 'Is insurance included?' },
        a: { ar: 'نعم، جميع أسعارنا تشمل تأميناً شاملاً لضمان راحة بالك التامة.', fr: 'Oui, tous nos prix incluent une assurance tous risques.', en: 'Yes, all our prices include full insurance.' }
    },
    {
        q: { ar: 'هل هناك حد أدنى للعمر للإيجار؟', fr: 'Quel est l\'âge minimum?', en: 'What is the minimum age?' },
        a: { ar: 'الحد الأدنى هو 21 عاماً، مع رخصة قيادة صالحة لمدة عامين على الأقل.', fr: 'L\'âge minimum est de 21 ans avec 2 ans de permis.', en: 'Minimum age is 21 with 2 years of driving license.' }
    },
];

/* ─── SCROLL EVENTS & DATA FETCHING ─── */
function CarImageSlider({ mainImg, extraImages }: { mainImg: string, extraImages?: string[] }) {
    const allImages = [mainImg, ...(extraImages || [])].filter(Boolean);
    const [index, setIndex] = useState(0);

    useEffect(() => {
        if (allImages.length <= 1) return;
        const itv = setInterval(() => {
            setIndex(prev => (prev + 1) % allImages.length);
        }, 3000); // cycle every 3 seconds
        return () => clearInterval(itv);
    }, [allImages.length]);

    return (
        <div style={{ width: '100%', height: '100%', position: 'relative' }}>
            {allImages.map((src, i) => (
                <img
                    key={src}
                    src={src.startsWith('http') ? src : IMAGE_BASE + src}
                    alt="car"
                    style={{
                        position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover',
                        opacity: i === index ? 1 : 0,
                        transition: 'opacity 1s ease-in-out',
                    }}
                />
            ))}
        </div>
    );
}

const NC_API = '/api';
const IMAGE_BASE = '';
const EMPTY_DB = { fleet: [], promoCars: [], carsForSale: [], phones: { phone1: '', phone2: '', phone3: '' } };

const fetchJsonWithTimeout = async (url: string, timeoutMs = 8000) => {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);
    try {
        const res = await fetch(url, { signal: controller.signal, cache: 'no-store' });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return await res.json();
    } finally {
        clearTimeout(timer);
    }
};

export default function NourCoches({ carSlug }: { carSlug?: string }) {
    const [scrollY, setScrollY] = useState(0);
    const [navSolid, setNavSolid] = useState(false);
    const [navVisible, setNavVisible] = useState(true);
    const lastScrollY = useRef(0);
    const [hovered, setHovered] = useState<number | null>(null);
    const [showPromoModal, setShowPromoModal] = useState(false);
    const [selectedSaleCar, setSelectedSaleCar] = useState<any>(null);
    const [galleryCar, setGalleryCar] = useState<any>(null);
    const [bookingCar, setBookingCar] = useState<any>(null);
    const [customerName, setCustomerName] = useState('');
    const [customerPhone, setCustomerPhone] = useState('');
    const [bookingDays, setBookingDays] = useState(1);
    const [currentImgIndex, setCurrentImgIndex] = useState(0);
    const [gallerySliding, setGallerySliding] = useState<'left' | 'right' | null>(null);
    const touchStartX = useRef<number>(0);
    const [bookingStartDate, setBookingStartDate] = useState(() => {
        const d = new Date(); d.setDate(d.getDate() + 1);
        return d.toISOString().split('T')[0];
    });
    const [bookingAge, setBookingAge] = useState('24');
    const [db, setDb] = useState<any>(null);
    const [lang, setLang] = useState<'ar' | 'fr' | 'en'>(() => {
        const saved = localStorage.getItem('nc_lang');
        if (saved && (saved === 'ar' || saved === 'fr' || saved === 'en')) return saved as any;

        // Auto-detect browser language
        const browserLang = navigator.language.toLowerCase();
        if (browserLang.startsWith('ar')) return 'ar';
        if (browserLang.startsWith('fr')) return 'fr';
        // Default to English if not Arabic or French
        return 'en';
    });
    const [currency, setCurrency] = useState<'MAD' | 'EUR'>('MAD');
    const [eurRate, setEurRate] = useState<number>(10.8);

    useEffect(() => {
        fetch('https://open.er-api.com/v6/latest/EUR')
            .then(r => r.json())
            .then(d => { if (d?.rates?.MAD) setEurRate(d.rates.MAD); })
            .catch(() => { });
    }, []);

    const formatPrice = (price: number) => {
        if (currency === 'EUR') return Math.round(price / eurRate).toString();
        return price.toString();
    };

    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const heroRef = useRef<HTMLDivElement>(null);


    const t = (path: string) => {
        const keys = path.split('.');
        let current: any = TRANSLATIONS[lang];
        for (const key of keys) {
            if (current[key] === undefined) return path;
            current = current[key];
        }
        return current;
    };

    // Common translations map for auto-localizing specs
    const SPEC_MAP: any = {
        "الناقل": { ar: "الناقل", fr: "Boîte", en: "Gearbox" },
        "المحرك": { ar: "المحرك", fr: "Moteur", en: "Engine" },
        "الأمان": { ar: "الأمان", fr: "Sécurité", en: "Safety" },
        "أوتو/يدوي": { ar: "أوتو/يدوي", fr: "Manuelle/Auto", en: "Manual/Auto" },
        "أوتوماتيك": { ar: "أوتوماتيك", fr: "Automatique", en: "Automatic" },
        "يدوي": { ar: "يدوي", fr: "Manuelle", en: "Manual" },
        "ديزل": { ar: "ديزل", fr: "Diesel", en: "Diesel" },
        "بنزين": { ar: "بنزين", fr: "Essence", en: "Petrol" },
        "ديزل / بنزين": { ar: "ديزل / بنزين", fr: "Diesel / Essence", en: "Diesel / Petrol" },
        "both_fuel": { ar: "ديزل / بنزين", fr: "Diesel / Essence", en: "Diesel / Petrol" },
        "ABS/ESP": { ar: "ABS/ESP", fr: "ABS/ESP", en: "ABS/ESP" },
        "كامل الخصائص": { ar: "كامل الخصائص", fr: "Toutes Options", en: "Full Specs" },
        "VIP": { ar: "VIP", fr: "VIP", en: "VIP" }
    };

    // Helper to get localized string from car objects (name/subtitle/specs)
    const L = (val: any) => {
        if (!val) return '';
        // If it's a string (Admin put just Arabic), try to find it in the common map
        if (typeof val === 'string') {
            const mapped = SPEC_MAP[val];
            if (mapped) return mapped[lang] || val;
            return val; // Fallback to raw string
        }
        // If it's already an object (multilingual)
        return val[lang] || val['en'] || val['fr'] || val['ar'] || '';
    };



    useEffect(() => {
        localStorage.setItem('nc_lang', lang);
    }, [lang]);

    useEffect(() => {
        let isCancelled = false;

        const loadDb = async () => {
            try {
                const data = await fetchJsonWithTimeout(`${NC_API}/data?_t=${Date.now()}`);
                if (!isCancelled) setDb(data);
                return;
            } catch (err) {
                console.error('Failed to load API DB:', err);
            }

            try {
                const backup = await fetchJsonWithTimeout(`/backend/db.json?_t=${Date.now()}`, 4000);
                if (!isCancelled) {
                    setDb(backup);
                    console.error('API unavailable. Loaded local backup data.');
                }
                return;
            } catch (err) {
                console.error('Failed to load backup DB:', err);
            }

            if (!isCancelled) {
                setDb(EMPTY_DB);
            }
        };

        loadDb();
        return () => { isCancelled = true; };
    }, []);

    // ═══════════════════ DEEP LINKING ═══════════════════
    useEffect(() => {
        if (!db) return;
        if (carSlug) {
            const allCars = [...(db.fleet || []), ...(db.promoCars || []), ...(db.carsForSale || [])];
            const car = allCars.find(c => c.slug === carSlug || c.slug === carSlug.replace(/-/g, ''));
            if (car) {
                if (db.carsForSale?.some((c: any) => c.id === car.id)) {
                    setSelectedSaleCar(car);
                } else {
                    setBookingCar(car);
                }
            }
        }
    }, [db, carSlug]);

    const syncCarUrl = (car: any | null) => {
        if (car && car.slug) {
            window.history.pushState(null, '', `/cars/${car.slug}`);
        } else {
            window.history.pushState(null, '', '/');
        }
    };

    useEffect(() => {
        // Scroll logic (Smart Navbar: hide on scroll down, show on scroll up)
        const onScroll = () => {
            const currentScrollY = window.scrollY;

            // Solid background check
            setNavSolid(currentScrollY > 80);

            // Visibility check (hide if scrolling down and past threshold)
            if (currentScrollY > lastScrollY.current && currentScrollY > 120) {
                setNavVisible(false);
            } else {
                setNavVisible(true);
            }

            lastScrollY.current = currentScrollY;
            setScrollY(currentScrollY);
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    // Keyboard navigation for gallery
    useEffect(() => {
        if (!galleryCar) return;
        const allImgs = [galleryCar.img, ...(galleryCar.images || [])].filter(Boolean);
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === 'ArrowRight') navigateGallery('right', allImgs.length);
            if (e.key === 'ArrowLeft') navigateGallery('left', allImgs.length);
            if (e.key === 'Escape') setGalleryCar(null);
        };
        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, [galleryCar, currentImgIndex]);

    const navigateGallery = (dir: 'left' | 'right', total: number) => {
        setGallerySliding(dir);
        setTimeout(() => {
            setCurrentImgIndex(prev => {
                if (dir === 'right') return prev === total - 1 ? 0 : prev + 1;
                return prev === 0 ? total - 1 : prev - 1;
            });
            setGallerySliding(null);
        }, 200);
    };

    const openGallery = (car: any, startIndex = 0) => {
        setGalleryCar(car);
        setCurrentImgIndex(startIndex);
    };

    // Loader if backend data hasn't arrived
    if (!db) return (
        <div style={{
            background: '#050505',
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#0055FF',
            position: 'relative',
            overflow: 'hidden'
        }}>
            {/* Background Grain/Stars effect */}
            <div style={{ position: 'absolute', inset: 0, opacity: 0.1, backgroundImage: 'radial-gradient(#fff 1px, transparent 0)', backgroundSize: '40px 40px' }} />

            <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', animation: 'fadeIn 1s ease' }}>
                <div style={{
                    width: 100, height: 100, margin: '0 auto 2rem',
                    padding: '10px', background: 'rgba(0, 85, 255,0.05)',
                    borderRadius: '24px', border: '1px solid rgba(0, 85, 255,0.2)',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
                    position: 'relative'
                }}>
                    <div style={{ position: 'absolute', inset: -5, borderRadius: '28px', border: '1px solid rgba(0, 85, 255,0.1)', animation: 'pulse 2s infinite' }} />
                    <img src={logo} alt="Logo" style={{ width: '100%', height: '100%', objectFit: 'contain', filter: 'drop-shadow(0 0 10px rgba(0, 85, 255,0.4))' }} />
                </div>

                <h1 style={{
                    fontWeight: 900,
                    fontSize: '2.2rem',
                    letterSpacing: '1px',
                    marginBottom: '0.4rem',
                    lineHeight: 1.2,
                    textTransform: 'uppercase'
                }}>
                    {lang === 'ar' ? 'سعدكوشيس' : 'Saadcoches'}
                </h1>

                <div style={{
                    fontSize: '0.7rem',
                    letterSpacing: '4px',
                    color: 'rgba(255,255,255,0.4)',
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    marginBottom: '2.5rem'
                }}>
                    Luxury Car Rental - Tanger
                </div>

                <div style={{
                    width: 40, height: 2,
                    background: 'linear-gradient(90deg, transparent, #0055FF, transparent)',
                    margin: '0 auto 1.5rem',
                    animation: 'shimmer 2s infinite'
                }} />

                <div style={{
                    fontWeight: 700,
                    fontSize: '0.65rem',
                    letterSpacing: '2px',
                    color: 'rgba(0, 85, 255,0.6)',
                    textTransform: 'uppercase'
                }}>
                    Chargement...
                </div>
            </div>
        </div>
    );

    // Dynamic WhatsApp Function
    const WA_MSG = encodeURIComponent(lang === 'ar' ? "مرحباً سعدكوشيس! أود حجز سيارة. ما هي المواعيد المتاحة؟" : "Bonjour Saadcoches ! Je souhaite réserver une voiture. Quelles sont vos disponibilités ?");
    const WA = (phone = db?.socialLinks?.whatsapp || db.phones.phone1) => `https://wa.me/${phone}?text=${WA_MSG}`;
    const IG = db?.socialLinks?.instagram || 'https://www.instagram.com/nour_coches/';
    const FB = db?.socialLinks?.facebook || 'https://www.facebook.com/brahim.tanjawii/';

    return (
        <div dir={t('dir')} style={{
            color: '#fff',
            fontFamily: t('font'),
            overflowX: 'hidden',
            minHeight: '100vh',
            position: 'relative'
        }}>
            {/* Dedicated fixed background div for scroll performance */}
            <div style={{
                position: 'fixed',
                top: 0, left: 0, right: 0, bottom: 0,
                zIndex: -1,
                backgroundImage: `linear-gradient(rgba(2, 8, 20, 0.82), rgba(2, 8, 20, 0.82)), url(${g63Image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                pointerEvents: 'none',
                willChange: 'transform'
            }} />
            {/* Removed dbError banner */}
            <nav style={{
                position: 'fixed', top: 0, left: 0, right: 0, zIndex: 9991,
                background: navSolid ? 'rgba(8,8,8,0.97)' : 'transparent',
                backdropFilter: navSolid ? 'blur(24px)' : 'none',
                borderBottom: navSolid ? '1px solid rgba(0, 85, 255,0.12)' : 'none',
                transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                transform: navVisible ? 'translateY(0)' : 'translateY(-100%)',
                opacity: navVisible ? 1 : 0
            }
            }>
                {/* PROMOTION BANNER */}
                {
                    db?.promoCars?.length > 0 && (
                        <div onClick={() => setShowPromoModal(true)} style={{
                            background: 'linear-gradient(90deg, #0033A0, #4D88FF, #0055FF, #4D88FF, #0033A0)',
                            backgroundSize: '200%', animation: 'shimmer 4s linear infinite',
                            color: '#000', textAlign: 'center',
                            padding: '0.8rem 1rem',
                            fontSize: '1rem', fontWeight: 900,
                            cursor: 'pointer',
                            position: 'relative',
                            overflow: 'hidden',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '1rem',
                            boxShadow: '0 4px 30px rgba(0, 85, 255,0.3)',
                        }}>
                            <div style={{
                                background: '#000', color: '#0055FF',
                                padding: '0.2rem 0.6rem', borderRadius: '4px',
                                fontSize: '0.7rem', textTransform: 'uppercase',
                                animation: 'glow 1.5s ease-in-out infinite',
                                whiteSpace: 'nowrap'
                            }}>
                                {lang === 'ar' ? 'عروض حصرية' : 'OFFRES EXCLUSIVES'}
                            </div>

                            <div style={{
                                display: 'flex',
                                whiteSpace: 'nowrap',
                                animation: 'marquee 12s linear infinite'
                            }}>
                                {t('promo.banner').replace('{cars}', db.promoCars.map((c: any) => `🎁 ${L(c.name).split(' ')[0]}`).join(' ، '))}
                            </div>


                            <div style={{ fontSize: '1.2rem', animation: 'bounceSmall 2s infinite' }}>
                                {t('dir') === 'rtl' ? '←' : '→'}
                            </div>
                        </div>
                    )
                }


                <div style={{ maxWidth: 1200, margin: '0 auto', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 2rem', height: navSolid ? '70px' : '88px', transition: 'all 0.45s ease' }}>
                    {/* Logo */}
                    <a href="#" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <div style={{
                            position: 'relative',
                            width: navSolid ? 45 : 60,
                            height: navSolid ? 45 : 60,
                            transition: 'all 0.45s cubic-bezier(0.4, 0, 0.2, 1)',
                            flexShrink: 0,
                            borderRadius: '12px',
                            padding: '2px',
                            background: 'rgba(255,255,255,0.03)',
                            border: '1px solid rgba(0, 85, 255,0.2)',
                            boxShadow: navSolid ? '0 4px 15px rgba(0,0,0,0.4)' : 'none',
                            overflow: 'hidden'

                        }}>
                            <img
                                src={logo}
                                alt="Saadcoches Logo"
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'contain',
                                    filter: 'drop-shadow(0 4px 12px rgba(0, 85, 255,0.3))',
                                    transition: 'transform 0.3s ease'
                                }}
                                onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.08)'}
                                onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                            />
                        </div>
                        {/* Brand Name - Hidden on mobile if logo is too big */}
                        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                            <div style={{ fontWeight: 900, fontSize: '1.25rem', letterSpacing: '0.5px', color: '#0055FF', lineHeight: 1.2 }}>{lang === 'ar' ? 'سعدكوشيس' : 'Saadcoches'}</div>
                            <div style={{ fontSize: '0.52rem', letterSpacing: '2px', color: 'rgba(255,255,255,0.4)', marginTop: 1, fontWeight: 700, textTransform: 'uppercase' }}>Luxury Car Rental - Tanger</div>
                        </div>
                    </a>

                    {/* Desktop Nav */}
                    <div className="desktop-nav" style={{
                        display: 'flex',
                        gap: 'clamp(0.5rem, 1.5vw, 1.5rem)',
                        alignItems: 'center',
                        flexShrink: 0
                    }}>
                        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                            <a href={IG} target="_blank" rel="noreferrer" style={{ color: 'rgba(255,255,255,0.6)', transition: 'color 0.3s' }} onMouseEnter={e => e.currentTarget.style.color = '#0055FF'} onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.6)'}>
                                <Instagram size={20} />
                            </a>
                            <a href={FB} target="_blank" rel="noreferrer" style={{ color: 'rgba(255,255,255,0.6)', transition: 'color 0.3s' }} onMouseEnter={e => e.currentTarget.style.color = '#0055FF'} onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.6)'}>
                                <Facebook size={20} />
                            </a>
                            <span style={{ color: 'rgba(255,255,255,0.2)' }}>|</span>
                        </div>
                        {[
                            [t('nav.fleet'), '#flotte'],
                            ...(db?.carsForSale?.length > 0 ? [[lang === 'ar' ? 'للبيع' : lang === 'fr' ? 'À VENDRE' : 'FOR SALE', '#forsale']] : []),
                            [t('nav.blog'), '/blog'],
                            [t('nav.services'), '#services'],
                            [t('nav.reviews'), '#avis'],
                            [t('nav.contact'), '#contact']
                        ].map(([label, href]) => {
                            const isForSale = href === '#forsale';
                            return (
                                <a key={label} href={href} style={{
                                    color: isForSale ? '#4ade80' : 'rgba(255,255,255,0.6)', textDecoration: 'none',
                                    fontSize: '0.9rem', fontWeight: isForSale ? 900 : 600, transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                                    display: 'flex', alignItems: 'center', gap: '6px',
                                    padding: isForSale ? '6px 14px' : '0',
                                    borderRadius: isForSale ? '50px' : '0',
                                    background: isForSale ? 'rgba(34,197,94,0.12)' : 'transparent',
                                    border: isForSale ? '1px solid rgba(34,197,94,0.4)' : 'none',
                                    boxShadow: isForSale ? '0 0 15px rgba(34,197,94,0.15)' : 'none',
                                    animation: isForSale ? 'greenGlowPulse 3s infinite' : 'none'
                                }}
                                    onMouseEnter={e => {
                                        if (isForSale) {
                                            e.currentTarget.style.background = '#22c55e';
                                            e.currentTarget.style.color = '#000';
                                            e.currentTarget.style.transform = 'scale(1.05) translateY(-1px)';
                                        } else {
                                            e.currentTarget.style.color = '#0055FF';
                                        }
                                    }}
                                    onMouseLeave={e => {
                                        if (isForSale) {
                                            e.currentTarget.style.background = 'rgba(34,197,94,0.12)';
                                            e.currentTarget.style.color = '#4ade80';
                                            e.currentTarget.style.transform = 'scale(1) translateY(0)';
                                        } else {
                                            e.currentTarget.style.color = 'rgba(255,255,255,0.6)';
                                        }
                                    }}>
                                    {isForSale && <span style={{ fontSize: '1rem' }}>🏷️</span>}
                                    {label}
                                </a>
                            );
                        })}

                        {/* Promo Navbar Button */}
                        {db?.promoCars?.length > 0 && (
                            <button onClick={() => setShowPromoModal(true)} style={{
                                background: 'linear-gradient(135deg, #0033A0, #0055FF)',
                                color: '#fff', border: 'none',
                                padding: '6px 14px', borderRadius: '50px',
                                fontWeight: 900, fontSize: '0.9rem',
                                cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px',
                                boxShadow: '0 0 15px rgba(0, 85, 255,0.3)',
                                animation: 'pulse 2s infinite',
                                fontFamily: 'inherit'
                            }}
                                onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.05) translateY(-1px)'; e.currentTarget.style.boxShadow = '0 0 25px rgba(0, 85, 255,0.5)'; }}
                                onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1) translateY(0)'; e.currentTarget.style.boxShadow = '0 0 15px rgba(0, 85, 255,0.3)'; }}>
                                🔥 {lang === 'ar' ? 'عروض' : lang === 'fr' ? 'PROMO' : 'PROMO'}
                            </button>
                        )}

                        {/* Currency Switcher */}
                        <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                            <select
                                value={currency}
                                onChange={e => setCurrency(e.target.value as any)}
                                style={{
                                    background: 'transparent', color: '#0055FF', border: 'none',
                                    fontWeight: 900, fontSize: '1rem', cursor: 'pointer',
                                    appearance: 'none', paddingRight: '1.2rem', outline: 'none',
                                    fontFamily: 'inherit'
                                }}
                            >
                                <option value="MAD" style={{ background: '#111', color: '#fff' }}>MAD</option>
                                <option value="EUR" style={{ background: '#111', color: '#fff' }}>EUR</option>
                            </select>
                            <span style={{ position: 'absolute', right: 0, pointerEvents: 'none', color: '#0055FF', fontSize: '0.7rem' }}>▼</span>
                            <span style={{ margin: '0 0.8rem', color: 'rgba(255,255,255,0.2)' }}>|</span>
                        </div>

                        {/* Language Switcher */}
                        <div style={{ display: 'flex', background: 'rgba(255,255,255,0.05)', padding: '4px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.1)' }}>
                            {(['ar', 'fr', 'en'] as const).map((l) => (
                                <button
                                    key={l}
                                    onClick={() => setLang(l)}
                                    style={{
                                        background: lang === l ? '#0055FF' : 'transparent',
                                        color: lang === l ? '#fff' : '#fff',
                                        border: 'none',
                                        padding: '4px 8px',
                                        borderRadius: '8px',
                                        fontSize: '0.75rem',
                                        fontWeight: 800,
                                        cursor: 'pointer',
                                        transition: 'all 0.3s',
                                        textTransform: 'uppercase'
                                    }}
                                >
                                    {l}
                                </button>
                            ))}
                        </div>



                    </div>

                    {/* Mobile Menu Toggle */}
                    <button
                        className="mobile-toggle"
                        onClick={() => setMobileMenuOpen(true)}
                        style={{
                            display: 'none', background: 'rgba(0, 85, 255,0.1)', border: '1px solid rgba(0, 85, 255,0.3)',
                            width: 50, height: 50, borderRadius: 12, alignItems: 'center', justifyContent: 'center', cursor: 'pointer'
                        }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 6, width: 24 }}>
                            <div style={{ height: 2, background: '#0055FF', width: '100%' }} />
                            <div style={{ height: 2, background: '#0055FF', width: '80%', alignSelf: t('dir') === 'rtl' ? 'flex-start' : 'flex-end' }} />
                            <div style={{ height: 2, background: '#0055FF', width: '100%' }} />
                        </div>
                    </button>

                </div>
            </nav >

            {/* Mobile Menu Drawer (Outside Nav to stay fixed) */}
            {
                mobileMenuOpen && (
                    <div style={{
                        position: 'fixed', inset: 0, zIndex: 10000,
                        background: '#040404',
                        padding: '1.5rem 2rem', display: 'flex', flexDirection: 'column',
                        animation: 'slideInRight 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                        overflowY: 'auto'
                    }}>
                        {/* TOP BAR */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
                            <img src={logo} alt="Logo" style={{ height: 35, objectFit: 'contain' }} />
                            <button onClick={() => setMobileMenuOpen(false)} style={{
                                background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
                                width: 44, height: 44, borderRadius: 14, color: '#fff', fontSize: '1.4rem',
                                cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center'
                            }}>✕</button>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                            {[
                                [t('nav.fleet'), '#flotte', '🏎️'],
                                ...(db?.carsForSale?.length > 0 ? [[lang === 'ar' ? 'للبيع' : lang === 'fr' ? 'VOITURES À VENDRE' : 'CARS FOR SALE', '#forsale', '🏷️']] : []),
                                [t('nav.blog'), '/blog', '📚'],
                                [t('nav.services'), '#services', '⚙️'],
                                [t('nav.reviews'), '#avis', '⭐'],
                                [t('nav.contact'), '#contact', '📍']
                            ].map(([label, href, emoji]) => {
                                const isForSale = href === '#forsale';
                                return (
                                    <a key={label} href={href} onClick={() => setMobileMenuOpen(false)} style={{
                                        color: isForSale ? '#4ade80' : '#fff', textDecoration: 'none', fontSize: '1.4rem', fontWeight: isForSale ? 900 : 800,
                                        padding: '1rem', borderRadius: 20,
                                        background: isForSale ? 'rgba(34,197,94,0.12)' : 'rgba(255,255,255,0.03)',
                                        display: 'flex', alignItems: 'center', gap: '16px',
                                        border: isForSale ? '1px solid rgba(34,197,94,0.4)' : '1px solid rgba(255,255,255,0.02)',
                                        animation: isForSale ? 'greenGlowPulse 4s infinite' : 'none',
                                        boxShadow: isForSale ? '0 5px 20px rgba(34,197,94,0.1)' : 'none'
                                    }}>
                                        <span style={{ fontSize: '1.6rem' }}>{emoji}</span>
                                        {label}
                                    </a>
                                );
                            })}

                            {/* Promo Button in Mobile Menu */}
                            {db?.promoCars?.length > 0 && (
                                <button onClick={() => { setShowPromoModal(true); setMobileMenuOpen(false); }} style={{
                                    background: 'linear-gradient(135deg, #0033A0, #0055FF)',
                                    color: '#fff', border: 'none',
                                    padding: '1rem', borderRadius: 20,
                                    fontWeight: 900, fontSize: '1.4rem',
                                    cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '16px',
                                    width: '100%', textAlign: 'left',
                                    boxShadow: '0 5px 20px rgba(0, 85, 255,0.25)',
                                    animation: 'pulse 2s infinite',
                                    fontFamily: 'inherit'
                                }}>
                                    <span style={{ fontSize: '1.6rem' }}>🔥</span>
                                    {lang === 'ar' ? 'عروض خاصة' : lang === 'fr' ? 'OFFRES PROMO' : 'PROMO DEALS'}
                                </button>
                            )}

                            <div style={{ height: '1px', background: 'rgba(255,255,255,0.08)', margin: '1rem 0' }} />

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                {/* Currency Switcher Mobile */}
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                                    <label style={{ fontSize: '0.7rem', color: '#666', fontWeight: 800, textTransform: 'uppercase', paddingLeft: 4 }}>💵 {lang === 'ar' ? 'العملة' : 'Devise'}</label>
                                    <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: 12, padding: '0.7rem', position: 'relative', border: '1px solid rgba(255,255,255,0.08)' }}>
                                        <select
                                            value={currency}
                                            onChange={e => setCurrency(e.target.value as any)}
                                            style={{
                                                background: 'transparent', color: '#fff', border: 'none',
                                                fontWeight: 900, fontSize: '0.9rem', cursor: 'pointer', width: '100%',
                                                appearance: 'none', outline: 'none', textAlign: 'center',
                                                fontFamily: 'inherit'
                                            }}
                                        >
                                            <option value="MAD" style={{ background: '#111', color: '#fff' }}>MAD (DH)</option>
                                            <option value="EUR" style={{ background: '#111', color: '#fff' }}>EUR (€)</option>
                                        </select>
                                        <span style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#0055FF', fontSize: '0.6rem' }}>▼</span>
                                    </div>
                                </div>

                                {/* Language Switcher Mobile */}
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                                    <label style={{ fontSize: '0.7rem', color: '#666', fontWeight: 800, textTransform: 'uppercase', paddingLeft: 4 }}>🌍 {lang === 'ar' ? 'اللغة' : 'Langue'}</label>
                                    <div style={{ display: 'flex', gap: '4px', background: 'rgba(255,255,255,0.05)', padding: '4px', borderRadius: 12, border: '1px solid rgba(255,255,255,0.08)' }}>
                                        {(['ar', 'fr', 'en'] as const).map((l) => (
                                            <button
                                                key={l}
                                                onClick={() => setLang(l)}
                                                style={{
                                                    flex: 1, background: lang === l ? '#0055FF' : 'transparent',
                                                    color: '#fff', border: 'none',
                                                    padding: '0.6rem 0', borderRadius: 8, fontWeight: 900, textTransform: 'uppercase',
                                                    fontSize: '0.65rem'
                                                }}>
                                                {l}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>


                        </div>

                        <div style={{ marginTop: 'auto', paddingTop: '3rem', textAlign: 'center' }}>
                            <p style={{ color: 'rgba(255,255,255,0.2)', fontSize: '0.7rem', letterSpacing: 2, textTransform: 'uppercase' }}>
                                Premium Service • {new Date().getFullYear()}
                            </p>
                        </div>
                    </div>
                )
            }

            {/* ═══════════════════ HERO ═══════════════════ */}
            <section ref={heroRef} className="hero-section" style={{ minHeight: '100vh', height: 'auto', position: 'relative', display: 'flex', alignItems: 'center', transition: 'all 0.3s' }}>
                <div style={{
                    position: 'absolute', inset: 0,
                    backgroundImage: `url(${IMAGE_BASE}/images/bugatti_hero.png)`,
                    backgroundSize: 'cover', backgroundPosition: 'center 40%',
                    transform: `translateY(${scrollY * 0.3}px)`,
                    filter: 'brightness(0.28) saturate(0.8)',
                    willChange: 'transform',
                }} />
                {/* Background Stars/Grain layer */}
                <div style={{ position: 'absolute', inset: 0, opacity: 0.15, backgroundImage: 'radial-gradient(#fff 1px, transparent 0)', backgroundSize: '60px 60px', zIndex: 1 }} />
                <div style={{ position: 'absolute', inset: 0, background: t('dir') === 'rtl' ? 'linear-gradient(to left, rgba(0,0,0,0.85) 50%, transparent)' : 'linear-gradient(to right, rgba(0,0,0,0.85) 50%, transparent)', zIndex: 1 }} />
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '40%', background: 'linear-gradient(transparent, #0a0a0a)', zIndex: 1 }} />

                <div className="hero-content" style={{
                    position: 'relative', zIndex: 2,
                    paddingTop: 'clamp(120px, 20vh, 200px)',
                    paddingBottom: '160px',
                    width: '100%', maxWidth: 1000, margin: '0 auto',
                    display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center',
                    paddingRight: '1rem', paddingLeft: '1rem'
                }}>

                    <h1 style={{
                        fontWeight: 900, fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
                        lineHeight: 1.1, marginBottom: '0.8rem',
                        animation: 'fadeInUp 0.8s ease both',
                        textShadow: '0 10px 30px rgba(0,0,0,0.5)',
                        textTransform: 'uppercase', letterSpacing: 2
                    }}>
                        <span style={{ color: '#fff' }}>{db?.storeName?.split(' ')[0] || 'SAADCOCHES'}</span>{' '}
                        <span style={{ color: '#0055FF' }}>{db?.storeName?.split(' ').slice(1).join(' ') || 'CAR'}</span>
                    </h1>

                    <p style={{
                        fontSize: 'clamp(1.1rem, 3vw, 1.4rem)', color: '#fff',
                        fontWeight: 600, marginBottom: '3.5rem',
                        animation: 'fadeInUp 1s 0.2s ease both', textShadow: '0 2px 10px rgba(0,0,0,0.5)'
                    }}>
                        {t('hero.title2') || 'Le leader de location de voitures'}
                    </p>

                    {/* ── DATE SEARCH BAR IN HERO ── */}
                    <div style={{
                        background: 'rgba(255,255,255,0.95)',
                        borderRadius: 4, width: '100%', maxWidth: 900,
                        display: 'flex', alignItems: 'stretch', flexWrap: 'wrap',
                        boxShadow: '0 8px 40px rgba(0,0,0,0.3)',
                        animation: 'fadeInUp 1s 0.4s ease both',
                        overflow: 'hidden',
                        marginBottom: '1.5rem'
                    }}>
                        {/* Start Date */}
                        <div className="search-date-field" style={{ flex: 1, minWidth: 140, padding: '1rem 1.2rem', borderRight: '1px solid #ddd', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <div style={{ fontSize: '0.75rem', color: '#0055FF', fontWeight: 900, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 6 }}>
                                {lang === 'ar' ? 'تاريخ الاستلام' : lang === 'fr' ? 'DATE DÉPART' : 'START DATE'}
                            </div>
                            <input
                                type="date"
                                value={bookingStartDate}
                                min={new Date().toISOString().split('T')[0]}
                                onChange={e => setBookingStartDate(e.target.value)}
                                style={{ background: 'transparent', border: 'none', color: '#111', fontSize: '1.2rem', fontWeight: 800, outline: 'none', cursor: 'pointer', fontFamily: 'inherit', width: 'auto', textAlign: 'center' }}
                            />
                        </div>

                        {/* Age - Hidden on Mobile */}
                        <div className="search-age-field" style={{ flex: 1, minWidth: 120, padding: '1rem 1.2rem', borderRight: '1px solid #ddd', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <div style={{ fontSize: '0.75rem', color: '#0055FF', fontWeight: 900, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 6 }}>
                                {lang === 'ar' ? 'العمر' : lang === 'fr' ? 'VOTRE ÂGE' : 'YOUR AGE'}
                            </div>
                            <select
                                value={bookingAge}
                                onChange={e => setBookingAge(e.target.value)}
                                style={{ background: 'transparent', border: 'none', color: '#111', fontSize: '1.2rem', fontWeight: 800, outline: 'none', cursor: 'pointer', fontFamily: 'inherit', width: 'auto', textAlign: 'center', appearance: 'none' }}
                            >
                                {Array.from({ length: 80 - 18 + 1 }, (_, i) => i + 18).map(age => (
                                    <option key={age} value={age}>{age}</option>
                                ))}
                            </select>
                        </div>

                        {/* Search CTA */}
                        <button
                            className="search-btn-field"
                            onClick={() => document.getElementById('flotte')?.scrollIntoView({ behavior: 'smooth' })}
                            style={{
                                background: '#0055FF', color: '#fff',
                                border: 'none', padding: '0 2rem', fontWeight: 900,
                                fontSize: '0.95rem', cursor: 'pointer', letterSpacing: 1,
                                flex: 1, minWidth: 160, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                                transition: 'all 0.2s', whiteSpace: 'nowrap',
                                height: 'auto'
                            }}
                            onMouseEnter={e => e.currentTarget.style.background = '#cc0000'}
                            onMouseLeave={e => e.currentTarget.style.background = '#0055FF'}
                        >
                            {lang === 'ar' ? 'ابحث ←' : lang === 'fr' ? 'CHERCHER →' : 'SEARCH →'}
                        </button>
                    </div>

                    {/* SALE BUTTON CTA */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' }}>
                        {db?.carsForSale?.length > 0 && (
                            <div
                                onClick={() => document.getElementById('forsale')?.scrollIntoView({ behavior: 'smooth' })}
                                style={{
                                    display: 'flex', alignItems: 'center', gap: '8px',
                                    background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.3)',
                                    padding: '0.7rem 1.5rem', borderRadius: '100px', cursor: 'pointer',
                                    transition: 'all 0.3s', animation: 'fadeInUp 1s 0.6s ease both',
                                    boxShadow: '0 10px 20px rgba(0,0,0,0.2)'
                                }}
                                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(34,197,94,0.2)'; e.currentTarget.style.transform = 'scale(1.05)'; }}
                                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(34,197,94,0.1)'; e.currentTarget.style.transform = 'scale(1)'; }}
                            >
                                <span style={{ fontSize: '1.2rem' }}>🏷️</span>
                                <span style={{ color: '#4ade80', fontWeight: 900, fontSize: '0.9rem', letterSpacing: 1 }}>
                                    {lang === 'ar' ? 'تصفح السيارات المعروضة للبيع' : lang === 'fr' ? 'VOIR LES VOITURES À VENDRE' : 'VIEW CARS FOR SALE'}
                                </span>
                                <span style={{
                                    width: 22, height: 22, borderRadius: '50%', background: '#22c55e', color: '#fff',
                                    fontSize: '0.7rem', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900
                                }}>
                                    {db.carsForSale.length}
                                </span>
                            </div>
                        )}

                        <button
                            onClick={() => { setBookingCar({ name: t('booking.generic'), price: 0 }); setBookingDays(1); setCustomerName(''); setCustomerPhone(''); }}
                            style={{
                                background: 'linear-gradient(45deg,#0033A0,#0055FF)',
                                color: '#fff',
                                padding: '1rem 3rem',
                                borderRadius: '100px',
                                border: 'none',
                                fontWeight: 900,
                                fontSize: '1.2rem',
                                cursor: 'pointer',
                                transition: 'all 0.3s',
                                boxShadow: '0 15px 35px rgba(0, 85, 255,0.4)',
                                animation: 'pulseGreen 2s infinite, fadeInUp 1s 0.8s ease both',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '12px',
                                textTransform: 'uppercase',
                                letterSpacing: '1px'
                            }}
                            onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.transform = 'translateY(-4px) scale(1.05)'; el.style.boxShadow = '0 20px 40px rgba(0, 85, 255,0.6)'; }}
                            onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.transform = ''; el.style.boxShadow = '0 15px 35px rgba(0, 85, 255,0.4)'; }}>
                            {t('nav.bookNow')}
                        </button>
                    </div>
                </div>

                {/* Hero Stats (Bottom Strip) */}
                <div className="hero-stats-container" style={{
                    position: 'absolute', bottom: 0, left: 0, right: 0,
                    padding: '2rem 1rem', display: 'flex', justifyContent: 'center', gap: 'clamp(2rem, 6vw, 6rem)',
                    flexWrap: 'wrap', zIndex: 3
                }}>
                    {[
                        [db?.stats?.clients || '3903', lang === 'ar' ? 'العملاء' : lang === 'fr' ? 'Clients' : 'Clients'],
                        [db?.stats?.vehicles || '45', lang === 'ar' ? 'المركبات' : lang === 'fr' ? 'Véhicules' : 'Vehicles'],
                        [db?.stats?.reservations || '9371', lang === 'ar' ? 'الحجوزات' : lang === 'fr' ? 'Réservations' : 'Reservations']
                    ].map(([v, l], i) => (
                        <div key={l} style={{
                            display: 'flex', alignItems: 'center', gap: 'clamp(2rem, 6vw, 6rem)'
                        }}>
                            {i > 0 && <div style={{ width: 1, height: 40, background: 'rgba(255,255,255,0.2)' }} className="hide-on-mobile" />}
                            <div style={{ textAlign: 'center', animation: 'fadeIn 1s 0.8s ease both' }}>
                                <div style={{ fontWeight: 900, fontSize: '2.5rem', color: '#fff', lineHeight: 1 }}>{v}</div>
                                <div style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.7)', marginTop: 4, fontWeight: 700 }}>{l}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ═══════════════════ FLEET ═══════════════════ */}
            <section id="flotte" style={{ padding: '7rem 2rem' }}>
                <div style={{ maxWidth: 1200, margin: '0 auto' }}>
                    {/* Heading */}
                    <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                        <div style={{ color: '#0055FF', fontSize: '0.9rem', fontWeight: 700, marginBottom: '1rem' }}>— {t('fleet.title')} —</div>
                        <h2 style={{ fontWeight: 900, fontSize: 'clamp(2rem,5vw,3.2rem)', marginBottom: '1rem' }}>
                            {t('fleet.subtitle1')}{' '}
                            <span style={{ background: 'linear-gradient(90deg,#0033A0,#0055FF)', WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{t('fleet.subtitle2')}</span>
                        </h2>
                        <p style={{ color: 'rgba(255,255,255,0.4)', maxWidth: 600, margin: '0 auto', lineHeight: 1.7, fontSize: '1.05rem' }}>
                            {t('fleet.desc')}
                        </p>
                    </div>



                    {/* Grid */}
                    <div className="fleet-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.2rem' }}>
                        {[...db.fleet].sort((a: any, b: any) => {
                            const aIsPromo = db.promoCars.some((p: any) => p.name === a.name);
                            const bIsPromo = db.promoCars.some((p: any) => p.name === b.name);
                            if (aIsPromo && !bIsPromo) return -1;
                            if (!aIsPromo && bIsPromo) return 1;
                            return a.price - b.price;
                        }).map((car: any) => {
                            const promoData = db?.promoCars?.find((p: any) => p.id === car.id || p.name?.en === car.name?.en);
                            const isPromo = !!promoData;
                            const isPromoCheaper = promoData && promoData.price < car.price;
                            const isSale = db?.carsForSale?.some((p: any) => p.id === car.id || p.name?.en === car.name?.en);

                            return (
                                <div key={car.id}
                                    className="fleet-card"
                                    style={{
                                        background: '#fff', borderRadius: 16,
                                        border: `1px solid ${hovered === car.id ? '#0055FF' : '#e8e8e8'}`,
                                        overflow: 'hidden', cursor: 'default',
                                        display: 'flex', flexDirection: 'column', alignItems: 'stretch',
                                        boxShadow: hovered === car.id ? '0 8px 30px rgba(0, 85, 255,0.15)' : '0 2px 12px rgba(0,0,0,0.08)',
                                        transition: 'all 0.3s ease',
                                        height: '100%'
                                    }}
                                    onMouseEnter={() => setHovered(car.id)}
                                    onMouseLeave={() => setHovered(null)}
                                >
                                    {/* Vertical layout for 4-column symmetry */}
                                    <div className="fleet-card-img" style={{ width: '100%', height: 160, flexShrink: 0, position: 'relative', background: '#f7f7f7', overflow: 'hidden', cursor: car.img ? 'pointer' : 'default' }}
                                        onClick={() => car.img && openGallery(car, 0)}>
                                        {isPromo && (
                                            <div className="promo-badge shimmer-bg" style={{
                                                position: 'absolute', top: 12, left: -35,
                                                background: 'linear-gradient(135deg, #0033A0 0%, #4D88FF 50%, #0033A0 100%)',
                                                backgroundSize: '200% 100%',
                                                color: '#fff',
                                                fontSize: '0.65rem', fontWeight: 900,
                                                padding: '5px 40px',
                                                transform: 'rotate(-45deg)',
                                                zIndex: 5, textTransform: 'uppercase', letterSpacing: 1,
                                                boxShadow: '0 4px 15px rgba(0, 85, 255,0.4)',
                                                pointerEvents: 'none',
                                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                border: '1px solid rgba(255,255,255,0.2)',
                                                animation: 'shimmer 2s infinite linear, pulse 2s infinite ease-in-out'
                                            }}>
                                                PROMO -40%
                                            </div>
                                        )}
                                        {isSale && (
                                            <div style={{
                                                position: 'absolute', top: 10, right: 10,
                                                background: 'linear-gradient(45deg, #15803d, #22c55e)',
                                                color: '#fff', padding: '3px 10px', borderRadius: 20,
                                                fontSize: '0.65rem', fontWeight: 900, letterSpacing: 1,
                                                boxShadow: '0 4px 12px rgba(34,197,94,0.4)',
                                                zIndex: 5
                                            }}>{lang === 'ar' ? 'للبيع' : 'À VENDRE'}</div>
                                        )}
                                        {car.img
                                            ? <img src={car.img.startsWith('http') ? car.img : IMAGE_BASE + car.img} alt={L(car.name)} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                            : <div style={{ width: '100%', height: '100%', minHeight: 160, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ccc', fontSize: '2rem' }}>🚗</div>
                                        }
                                        {car.img && (
                                            <div style={{ position: 'absolute', bottom: 6, right: 6, background: 'rgba(0,0,0,0.55)', color: '#fff', fontSize: '0.6rem', padding: '2px 6px', borderRadius: 4, fontWeight: 700 }}>
                                                📷 {1 + (car.images?.length || 0)}
                                            </div>
                                        )}
                                    </div>

                                    {/* RIGHT: Info */}
                                    <div className="fleet-card-info" style={{ flex: 1, padding: '1rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                                        {/* Top */}
                                        <div>
                                            <div className="header-flex" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 4 }}>
                                                <h3 style={{ fontWeight: 900, fontSize: '1.15rem', color: '#111', margin: 0, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                                                    {L(car.name)}
                                                </h3>
                                                <span className="avail-badge" style={{
                                                    display: 'flex', alignItems: 'center', gap: '6px',
                                                    background: car.count > 0 ? '#e6f4ea' : '#fce8e6',
                                                    color: car.count > 0 ? '#137333' : '#a50e0e',
                                                    fontSize: '0.8rem', fontWeight: 900, padding: '4px 12px', borderRadius: 20,
                                                    border: `1px solid ${car.count > 0 ? '#ceead6' : '#fad2cf'}`,
                                                    whiteSpace: 'nowrap', marginLeft: 6
                                                }}>
                                                    {car.count > 0 ? (lang === 'ar' ? 'متوفر' : lang === 'fr' ? 'Dispo' : 'Available') : (lang === 'ar' ? 'غير متوفر' : lang === 'fr' ? 'Indispo' : 'Unavailable')}
                                                    <span style={{
                                                        width: 8, height: 8, borderRadius: '50%',
                                                        background: car.count > 0 ? '#137333' : '#a50e0e',
                                                        animation: car.count > 0 ? 'pulseGreen 2s infinite' : 'none'
                                                    }}></span>
                                                </span>
                                            </div>
                                            {/* Stars */}
                                            <div className="stars-row" style={{ color: '#0055FF', fontSize: '0.85rem', marginBottom: 8 }}>★★★★★</div>

                                            {/* Quick Specs */}
                                            <div className="specs-col" style={{ display: 'flex', flexDirection: 'column', gap: 3, fontSize: '0.82rem', color: '#444', marginBottom: 10 }}>
                                                <div>
                                                    <span style={{ color: '#888' }}>{lang === 'ar' ? 'الوقود:' : lang === 'fr' ? 'Carburant:' : 'Fuel:'}</span>{' '}
                                                    <strong>
                                                        {car.fuel === 'both' || car.fuel === 'diesel_petrol'
                                                            ? (lang === 'ar' ? 'ديزل / بنزين' : lang === 'fr' ? 'Diesel / Essence' : 'Diesel / Petrol')
                                                            : car.fuel === 'diesel'
                                                                ? (lang === 'ar' ? 'ديزل' : lang === 'fr' ? 'Diesel' : 'Diesel')
                                                                : (lang === 'ar' ? 'بنزين' : lang === 'fr' ? 'Essence' : 'Petrol')}
                                                    </strong>
                                                </div>
                                                {car.specs?.slice(0, 1).map((s: any) => (
                                                    <div key={L(s.label)}><span style={{ color: '#888' }}>{L(s.label)}:</span> <strong>{L(s.value)}</strong></div>
                                                ))}
                                                {car.clim && <div><span style={{ color: '#888' }}>Climatisation:</span> <strong>{car.clim}</strong></div>}
                                            </div>

                                            {/* Icons: places / valises / portes */}
                                            {(car.places || car.valises || car.portes) && (
                                                <div className="icons-row" style={{ display: 'flex', gap: 14, fontSize: '0.78rem', color: '#555', marginBottom: 10, flexWrap: 'wrap' }}>
                                                    {car.places && <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><span>👥</span> {car.places} Places</span>}
                                                    {car.valises && <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><span>💼</span> {car.valises} Valises</span>}
                                                    {car.portes && <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><span>🚘</span> {car.portes} Portes</span>}
                                                </div>
                                            )}
                                        </div>

                                        {/* Bottom: Price + Buttons */}
                                        <div>
                                            <div className="price-row" style={{ marginBottom: 10 }}>
                                                <span className="price-label" style={{ color: '#888', fontSize: '0.8rem' }}>À partir de </span>
                                                {isPromo ? (
                                                    <>
                                                        <span className="price-val" style={{ fontWeight: 900, fontSize: '1.5rem', color: '#4D88FF', textShadow: '0 0 10px rgba(255,59,59,0.5)', animation: 'pulseText 2s infinite' }}>{formatPrice(promoData.price)} {currency}</span>
                                                        <span style={{ color: '#aaa', fontSize: '0.9rem', textDecoration: 'line-through', marginLeft: 8 }}>{formatPrice(Math.round((promoData.price || car.price) / 0.6))} {currency}</span>
                                                    </>
                                                ) : (
                                                    <span className="price-val" style={{
                                                        fontWeight: 900, fontSize: '1.4rem', color: '#22c55e',
                                                        background: 'linear-gradient(135deg, #0a1a0a, #111)',
                                                        padding: '4px 12px', borderRadius: '10px',
                                                        display: 'inline-block',
                                                        boxShadow: '0 4px 12px rgba(34,197,94,0.15)',
                                                        border: '1px solid rgba(34,197,94,0.3)'
                                                    }}>
                                                        {formatPrice(car.price)} <span style={{ fontSize: '0.9rem', color: '#888' }}>{currency}</span>
                                                    </span>
                                                )}
                                                <span className="price-unit" style={{ color: '#888', fontSize: '0.78rem' }}> par jour</span>
                                            </div>
                                            <div className="btn-row" style={{ display: 'flex', gap: 8 }}>
                                                <button
                                                    disabled={!car.count || car.count <= 0}
                                                    onClick={() => {
                                                        if (!car.count || car.count <= 0) return;
                                                        // Use promo price if available, otherwise original price
                                                        const finalPrice = isPromoCheaper ? promoData.price : car.price;
                                                        const bCar = { ...car, price: finalPrice };
                                                        setBookingCar(bCar);
                                                        syncCarUrl(bCar);
                                                        setBookingDays(isPromo ? 5 : 1);
                                                        setCustomerName('');
                                                        setCustomerPhone('');
                                                    }}
                                                    style={{
                                                        flex: 1, background: (!car.count || car.count <= 0) ? '#555' : '#0055FF', color: '#fff',
                                                        border: 'none', padding: '0.65rem 1rem', borderRadius: 8,
                                                        fontWeight: 800, fontSize: '0.88rem', cursor: (!car.count || car.count <= 0) ? 'not-allowed' : 'pointer',
                                                        transition: 'all 0.2s', letterSpacing: 0.5,
                                                        opacity: (!car.count || car.count <= 0) ? 0.6 : 1
                                                    }}
                                                    onMouseEnter={e => { if (car.count > 0) e.currentTarget.style.background = '#c00000'; }}
                                                    onMouseLeave={e => { if (car.count > 0) e.currentTarget.style.background = '#0055FF'; }}
                                                >
                                                    {(!car.count || car.count <= 0) ? (lang === 'ar' ? '🚫 غير متوفر' : lang === 'fr' ? '🚫 Indisponible' : '🚫 Unavailable') : (lang === 'ar' ? 'احجز الآن' : lang === 'fr' ? 'Choisissez la date' : 'Book Now')}
                                                </button>
                                                {car.img && (
                                                    <button
                                                        onClick={() => openGallery(car, 0)}
                                                        style={{ background: '#f5f5f5', color: '#555', border: '1px solid #ddd', padding: '0.65rem 0.9rem', borderRadius: 8, cursor: 'pointer', fontSize: '0.85rem', transition: 'all 0.2s' }}
                                                        onMouseEnter={e => { e.currentTarget.style.background = '#fde8e8'; e.currentTarget.style.color = '#0055FF'; }}
                                                        onMouseLeave={e => { e.currentTarget.style.background = '#f5f5f5'; e.currentTarget.style.color = '#555'; }}
                                                        title="Voir les photos"
                                                    >📷</button>
                                                )}
                                                {db?.promoCars?.some((p: any) => L(p.name) === L(car.name)) && (
                                                    <button
                                                        onClick={() => setShowPromoModal(true)}
                                                        style={{ background: '#fff5f5', color: '#0055FF', border: '1px solid #fca5a5', padding: '0.65rem 0.9rem', borderRadius: 8, cursor: 'pointer', fontSize: '0.85rem', animation: 'bounceSmall 2s infinite' }}
                                                        title="Promotion"
                                                    >🎁</button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ═══════════════════ CARS FOR SALE ═══════════════════ */}
            {
                (db?.carsForSale?.length > 0) && (
                    <section id="forsale" style={{ padding: '7rem 2rem', background: '#080808', borderTop: '1px solid rgba(34,197,94,0.08)' }}>
                        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
                            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                                <div style={{ color: '#22c55e', fontSize: '0.9rem', fontWeight: 700, marginBottom: '1rem' }}>— {lang === 'ar' ? 'سيارات للبيع' : lang === 'fr' ? 'Voitures à Vendre' : 'Cars For Sale'} —</div>
                                <h2 style={{ fontWeight: 900, fontSize: 'clamp(2rem,5vw,3.2rem)', marginBottom: '1rem' }}>
                                    {lang === 'ar' ? 'اغتنم ' : lang === 'fr' ? 'Saisissez l\'' : 'Grab the '}
                                    <span style={{ background: 'linear-gradient(90deg,#15803d,#22c55e)', WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{lang === 'ar' ? 'الفرصة' : lang === 'fr' ? 'opportunité' : 'Opportunity'}</span>
                                </h2>
                                <p style={{ color: 'rgba(255,255,255,0.4)', maxWidth: 600, margin: '0 auto', lineHeight: 1.7, fontSize: '1.05rem' }}>
                                    {lang === 'ar' ? 'سيارات مستعملة بحالة ممتازة متاحة للبيع الآن. فحص تقني كامل ووثائق جاهزة.' : lang === 'fr' ? 'Véhicules d\'occasion en excellent état disponibles à la vente. Contrôle technique complet et documents prêts.' : 'Used cars in excellent condition available for sale now. Full technical inspection and documents ready.'}
                                </p>
                            </div>

                            <div className="fleet-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.2rem' }}>
                                {(db.carsForSale || []).map((car: any) => (
                                    <div key={car.id}
                                        className="fleet-card"
                                        onClick={() => setSelectedSaleCar(car)}
                                        style={{
                                            background: '#111', borderRadius: 16,
                                            border: '1px solid rgba(34,197,94,0.15)',
                                            overflow: 'hidden', cursor: 'pointer',
                                            display: 'flex', flexDirection: 'column',
                                            transition: 'all 0.3s ease',
                                        }}
                                        onMouseEnter={e => { e.currentTarget.style.borderColor = '#22c55e'; e.currentTarget.style.boxShadow = '0 8px 30px rgba(34,197,94,0.15)'; e.currentTarget.style.transform = 'translateY(-4px)'; }}
                                        onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(34,197,94,0.15)'; e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'none'; }}
                                    >
                                        <div className="fleet-card-img" style={{ width: '100%', height: 160, flexShrink: 0, position: 'relative', background: '#0a0a0a', overflow: 'hidden' }}>
                                            {car.img
                                                ? <img src={car.img.startsWith('http') ? car.img : IMAGE_BASE + car.img} alt={L(car.name)} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s' }} />
                                                : <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#333', fontSize: '2rem' }}>🏷️</div>
                                            }
                                            {/* FOR SALE badge */}
                                            <div style={{
                                                position: 'absolute', top: 10, right: 10,
                                                background: 'linear-gradient(45deg, #15803d, #22c55e)',
                                                color: '#fff', padding: '3px 10px', borderRadius: 20,
                                                fontSize: '0.65rem', fontWeight: 900, letterSpacing: 1,
                                                boxShadow: '0 4px 12px rgba(34,197,94,0.4)'
                                            }}>{lang === 'ar' ? 'للبيع' : 'À VENDRE'}</div>
                                            {/* Year badge */}
                                            <div style={{
                                                position: 'absolute', bottom: 8, left: 8,
                                                background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)',
                                                color: '#4ade80', padding: '2px 8px', borderRadius: 6,
                                                fontSize: '0.7rem', fontWeight: 800,
                                            }}>{car.year}</div>
                                        </div>

                                        <div className="fleet-card-info" style={{ flex: 1, padding: '1rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                                            <div>
                                                <h3 style={{ fontWeight: 900, fontSize: '1rem', color: '#fff', margin: '0 0 4px', textTransform: 'uppercase' }}>{L(car.name)}</h3>

                                                {/* Quick specs tags */}
                                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginBottom: '8px' }}>
                                                    <span style={{ background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.2)', padding: '2px 6px', borderRadius: 4, fontSize: '0.65rem', color: '#4ade80', fontWeight: 700 }}>{car.km?.toLocaleString()} km</span>
                                                    <span style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', padding: '2px 6px', borderRadius: 4, fontSize: '0.65rem', color: 'rgba(255,255,255,0.5)', fontWeight: 700 }}>{car.fuel === 'diesel' ? 'Diesel' : car.fuel === 'petrol' ? (lang === 'ar' ? 'بنزين' : 'Essence') : 'Diesel/Essence'}</span>
                                                    <span style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', padding: '2px 6px', borderRadius: 4, fontSize: '0.65rem', color: 'rgba(255,255,255,0.5)', fontWeight: 700 }}>{car.transmission === 'auto' ? 'Auto' : (lang === 'ar' ? 'يدوي' : 'Manuelle')}</span>
                                                </div>

                                                <div style={{ display: 'flex', gap: '8px', fontSize: '0.72rem', color: 'rgba(255,255,255,0.35)', marginBottom: '8px' }}>
                                                    {car.firstOwner && <span>👤 {lang === 'ar' ? 'مالك أول' : '1ère main'}</span>}
                                                    {car.technicalControl && <span>✅ {lang === 'ar' ? 'فحص' : 'CT OK'}</span>}
                                                </div>
                                            </div>

                                            <div>
                                                <div style={{ fontWeight: 900, fontSize: '1.35rem', color: '#4D88FF', marginBottom: '6px', animation: 'pulseText 2s infinite' }}>
                                                    {car.salePrice?.toLocaleString()} <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.35)' }}>DH</span>
                                                </div>
                                                <button style={{
                                                    width: '100%', background: 'linear-gradient(45deg, #0033A0, #0055FF)', color: '#fff',
                                                    border: 'none', padding: '0.55rem', borderRadius: 8, fontWeight: 800, fontSize: '0.8rem',
                                                    cursor: 'pointer', transition: 'all 0.2s', fontFamily: 'inherit'
                                                }}
                                                    onMouseEnter={e => e.currentTarget.style.opacity = '0.9'}
                                                    onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                                                    onClick={() => {
                                                        setSelectedSaleCar(car);
                                                        syncCarUrl(car);
                                                    }}
                                                >{lang === 'ar' ? 'عرض التفاصيل' : lang === 'fr' ? 'Voir détails' : 'View Details'}</button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                )
            }

            {/* ═══════════════════ WHY US ═══════════════════ */}
            <section style={{ padding: '7rem 2rem', background: '#080808', borderTop: '1px solid rgba(255,255,255,0.03)' }}>
                <div className="why-us-flex" style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', gap: '4rem', flexWrap: 'wrap', alignItems: 'center' }}>
                    <div style={{ flex: '1 1 500px' }}>
                        <div style={{ color: '#0055FF', fontSize: '0.9rem', fontWeight: 700, marginBottom: '1rem' }}>— {t('whyUs.title')} —</div>
                        <h2 style={{ fontWeight: 900, fontSize: 'clamp(2rem,5vw,3rem)', marginBottom: '1.5rem', lineHeight: 1.2 }}>
                            {t('whyUs.subtitle1')}<br />
                            <span style={{ background: 'linear-gradient(90deg,#0033A0,#0055FF)', WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{t('whyUs.subtitle2')}</span>
                        </h2>
                        <p style={{ color: 'rgba(255,255,255,0.45)', lineHeight: 1.8, fontSize: '1.1rem', marginBottom: '2.5rem' }}>
                            {t('whyUs.desc')}
                        </p>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                            {[
                                [t('whyUs.cars'), '50+'],
                                [t('whyUs.clients'), '3000+'],
                                [t('whyUs.support'), '24/7'],
                                [t('whyUs.rating'), '4.9/5']
                            ].map(([l, v]) => (
                                <div key={l}>
                                    <div style={{ fontWeight: 900, fontSize: '1.5rem', color: '#0055FF', marginBottom: 4 }}>{v}</div>
                                    <div style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.4)', fontWeight: 600 }}>{l}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div style={{ flex: '1 1 400px', position: 'relative' }}>
                        <div style={{ position: 'relative', borderRadius: 30, overflow: 'hidden', boxShadow: '0 30px 60px rgba(0,0,0,0.5)' }}>
                            <img src={g63Image} alt="premium luxury suv" style={{ width: '100%', display: 'block' }} />
                        </div>
                        <div style={{ position: 'absolute', bottom: -20, left: t('dir') === 'rtl' ? 'auto' : -20, right: t('dir') === 'rtl' ? -20 : 'auto', background: 'linear-gradient(45deg,#0033A0,#0055FF)', padding: '1.5rem 2rem', borderRadius: 20, boxShadow: '0 20px 40px rgba(0, 85, 255,0.3)', color: '#fff', fontWeight: 900, fontSize: '1.2rem' }}>
                            {lang === 'ar' ? 'منذ 2019' : 'Since 2019'}
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══════════════════ SERVICES ═══════════════════ */}
            <section id="services" style={{ padding: '7rem 2rem' }}>
                <div style={{ maxWidth: 1200, margin: '0 auto' }}>
                    <div style={{ textAlign: 'center', marginBottom: '4.5rem' }}>
                        <div style={{ color: '#0055FF', fontSize: '0.9rem', fontWeight: 700, marginBottom: '1rem' }}>— {t('services.title')} —</div>
                        <h2 style={{ fontWeight: 900, fontSize: 'clamp(2rem,5vw,3rem)' }}>
                            {t('services.subtitle1')}<span style={{ color: '#0055FF' }}>{t('services.subtitle2')}</span>
                        </h2>
                    </div>
                    <div className="services-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(340px,1fr))', gap: '2rem' }}>
                        {SERVICES.map((s) => (
                            <div key={s.title.en} style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', padding: '2.5rem', borderRadius: 24, transition: 'all 0.3s' }} onMouseEnter={e => { e.currentTarget.style.background = 'rgba(0, 85, 255,0.05)'; e.currentTarget.style.borderColor = 'rgba(0, 85, 255,0.2)'; e.currentTarget.style.transform = 'translateY(-5px)'; }} onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.02)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)'; e.currentTarget.style.transform = 'none'; }}>
                                <div style={{ fontSize: '2.5rem', marginBottom: '1.2rem' }}>{s.icon}</div>
                                <h3 style={{ fontWeight: 800, fontSize: '1.3rem', marginBottom: '0.8rem' }}>{s.title[lang]}</h3>
                                <p style={{ color: 'rgba(255,255,255,0.4)', lineHeight: 1.7, fontSize: '0.95rem' }}>{s.desc[lang]}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══════════════════ REVIEWS ═══════════════════ */}
            <section id="avis" style={{ padding: '7rem 2rem', background: '#080808' }}>
                <div style={{ maxWidth: 1200, margin: '0 auto' }}>
                    <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                        <div style={{ color: '#0055FF', fontSize: '0.9rem', fontWeight: 700, marginBottom: '1rem' }}>— {lang === 'ar' ? 'آراء العملاء' : 'Testimonials'} —</div>
                        <h2 style={{ fontWeight: 900, fontSize: 'clamp(2rem,5vw,3rem)' }}>{lang === 'ar' ? 'ماذا يقولون عنا؟' : 'What our clients say'}</h2>
                    </div>
                    <div className="reviews-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(400px,1fr))', gap: '2rem' }}>
                        {TESTIMONIALS.map((r) => (
                            <div key={r.name.en} style={{ background: '#121212', padding: '2.5rem', borderRadius: 24, border: '1px solid rgba(255,255,255,0.04)', position: 'relative' }}>
                                <div style={{ color: '#0055FF', fontSize: '1.2rem', marginBottom: '1rem' }}>{'★'.repeat(r.stars)}</div>
                                <p style={{ fontSize: '1.05rem', lineHeight: 1.7, color: 'rgba(255,255,255,0.7)', fontStyle: 'italic', marginBottom: '1.8rem' }}>"{r.text[lang]}"</p>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                    <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'linear-gradient(45deg,#222,#444)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, color: '#0055FF' }}>{r.name[lang][0]}</div>
                                    <div>
                                        <div style={{ fontWeight: 800 }}>{r.name[lang]}</div>
                                        <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.3)' }}>{r.city[lang]}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══════════════════ PROCESS ═══════════════════ */}
            <section style={{ padding: '7rem 2rem' }}>
                <div style={{ maxWidth: 1200, margin: '0 auto' }}>
                    <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
                        <div style={{ color: '#0055FF', fontSize: '0.9rem', fontWeight: 700, marginBottom: '1rem' }}>— {t('process.title')} —</div>
                        <h2 style={{ fontWeight: 900, fontSize: 'clamp(2rem,5vw,3rem)' }}>
                            {t('process.subtitle1')}<span style={{ color: '#0055FF' }}>{t('process.subtitle2')}</span>
                        </h2>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: '3rem', flexWrap: 'wrap', position: 'relative' }}>
                        <div className="process-line" style={{ position: 'absolute', top: '40px', left: '10%', right: '10%', height: '2px', background: 'rgba(0, 85, 255,0.1)', zIndex: 0 }} />
                        {PROCESS.map((p) => (
                            <div key={p.step} style={{ flex: '1 1 280px', textAlign: 'center', position: 'relative', zIndex: 1 }}>
                                <div style={{ width: 84, height: 84, borderRadius: 25, background: '#121212', border: '2px solid #0055FF', color: '#0055FF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.8rem', fontWeight: 900, margin: '0 auto 1.8rem', boxShadow: '0 10px 30px rgba(0, 85, 255,0.15)' }}>{p.step}</div>
                                <h3 style={{ fontWeight: 800, fontSize: '1.3rem', marginBottom: '1rem' }}>{p.title[lang]}</h3>
                                <p style={{ color: 'rgba(255,255,255,0.4)', lineHeight: 1.7 }}>{p.desc[lang]}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══════════════════ FAQ ═══════════════════ */}
            <section style={{ padding: '7rem 2rem', background: '#080808' }}>
                <div style={{ maxWidth: 800, margin: '0 auto' }}>
                    <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                        <div style={{ color: '#0055FF', fontSize: '0.9rem', fontWeight: 700, marginBottom: '1rem' }}>— {t('faq.title')} —</div>
                        <h2 style={{ fontWeight: 900, fontSize: 'clamp(2rem,5vw,3rem)' }}>{t('faq.subtitle1')}<span style={{ color: '#0055FF' }}>{t('faq.subtitle2')}</span></h2>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                        {FAQS.map((f) => (
                            <details key={f.q.en} style={{ background: '#121212', borderRadius: 16, border: '1px solid rgba(255,255,255,0.05)', overflow: 'hidden' }}>
                                <summary style={{ padding: '1.5rem', fontWeight: 700, cursor: 'pointer', listStyle: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    {f.q[lang]}
                                    <span style={{ color: '#0055FF' }}>↓</span>
                                </summary>
                                <div style={{ padding: '0 1.5rem 1.5rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.7 }}>
                                    {f.a[lang]}
                                </div>
                            </details>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══════════════════ CTA BAND ═══════════════════ */}
            <section style={{
                padding: '5.5rem 2rem', textAlign: 'center',
                background: 'linear-gradient(135deg,#0e0900,#1a0000,#0e0900)',
                borderTop: '1px solid rgba(0, 85, 255,0.18)', borderBottom: '1px solid rgba(0, 85, 255,0.18)',
            }}>
                <div style={{ maxWidth: 700, margin: '0 auto' }}>
                    <h2 style={{ fontWeight: 900, fontSize: 'clamp(1.8rem,4.5vw,3rem)', marginBottom: '0.8rem' }}>
                        {t('cta.title1')}<span style={{ color: '#0055FF' }}>{t('cta.title2')}</span>{t('cta.title3')}
                    </h2>
                    <p style={{ color: 'rgba(255,255,255,0.45)', marginBottom: '2.5rem', fontSize: '1.1rem', lineHeight: 1.7 }}>
                        {t('cta.desc')}
                    </p>
                    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                        {[
                            { num: db.phones.phone1, display: db.phones.phone1 },
                            { num: db.phones.phone2, display: db.phones.phone2 },
                            { num: db.phones.phone3, display: db.phones.phone3 }
                        ].map((p, i) => (
                            <a key={i} href={WA(p.num)} target="_blank" rel="noreferrer" style={{
                                background: 'linear-gradient(45deg,#0033A0,#0055FF)', color: '#fff',
                                padding: '0.9rem 1.8rem', borderRadius: 10, textDecoration: 'none',
                                fontWeight: 800, fontSize: '1rem',
                                transition: 'all 0.3s',
                                direction: 'ltr', display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center'
                            }}
                                onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.transform = 'translateY(-3px)'; el.style.boxShadow = '0 12px 28px rgba(0, 85, 255,0.4)'; }}
                                onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.transform = ''; el.style.boxShadow = ''; }}>
                                <span>📲</span> {p.display}
                            </a>
                        ))}

                    </div>
                </div>
            </section>

            {/* ═══════════════════ LATEST BLOG POSTS ═══════════════════ */}
            {
                db?.posts?.filter((p: any) => p.published).length > 0 && (
                    <section style={{ padding: '7rem 2rem', background: '#0a0a0a' }}>
                        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3.5rem', flexWrap: 'wrap', gap: '1rem' }}>
                                <div>
                                    <div style={{ color: '#0055FF', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.8rem', textTransform: 'uppercase', letterSpacing: 1 }}>— Blog & Astuces</div>
                                    <h2 style={{ fontWeight: 900, fontSize: 'clamp(2rem,4vw,2.8rem)', margin: 0 }}>
                                        {lang === 'ar' ? 'أحدث' : 'Derniers'} <span style={{ color: '#0055FF' }}>{lang === 'ar' ? 'المقالات' : 'Articles'}</span>
                                    </h2>
                                </div>
                                <a href="/blog" style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#fff', textDecoration: 'none', fontWeight: 800, fontSize: '0.9rem', borderBottom: '2px solid transparent', paddingBottom: 4, transition: 'all 0.3s' }}
                                    onMouseEnter={e => e.currentTarget.style.borderBottomColor = '#0055FF'}
                                    onMouseLeave={e => e.currentTarget.style.borderBottomColor = 'transparent'}>
                                    {lang === 'ar' ? 'عرض المدونة كاملة' : 'Voir tout le blog'} →
                                </a>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
                                {db.posts.filter((p: any) => p.published).slice(0, 3).map((post: any) => (
                                    <a key={post.id} href={`/blog/${post.slug}`} style={{ background: '#111', borderRadius: 20, overflow: 'hidden', textDecoration: 'none', border: '1px solid rgba(255,255,255,0.05)', display: 'flex', flexDirection: 'column', transition: 'all 0.3s ease' }}
                                        onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.transform = 'translateY(-6px)'; el.style.boxShadow = '0 20px 40px rgba(0,0,0,0.5)'; el.style.borderColor = 'rgba(0, 85, 255,0.2)'; }}
                                        onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.transform = ''; el.style.boxShadow = ''; el.style.borderColor = 'rgba(255,255,255,0.05)'; }}>
                                        <div style={{ height: 200, background: '#1a1a1a', position: 'relative' }}>
                                            {post.coverImage ? (
                                                <img src={post.coverImage.startsWith('http') ? post.coverImage : `${IMAGE_BASE}${post.coverImage}`} alt={post.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                            ) : (
                                                <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3rem' }}>📝</div>
                                            )}
                                        </div>
                                        <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                                            <div style={{ fontSize: '0.75rem', color: '#0055FF', fontWeight: 800, marginBottom: '0.5rem', textTransform: 'uppercase' }}>
                                                {post.tags?.[0] || 'Article'}
                                            </div>
                                            <h3 style={{ color: '#fff', fontSize: '1.1rem', fontWeight: 900, marginBottom: '0.8rem', lineHeight: 1.4, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                                                {post.title}
                                            </h3>
                                            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem', lineHeight: 1.6, marginBottom: '1.5rem', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden', flex: 1 }}>
                                                {post.excerpt}
                                            </p>
                                            <div style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.75rem', fontWeight: 600 }}>
                                                {post.publishedAt}
                                            </div>
                                        </div>
                                    </a>
                                ))}
                            </div>
                        </div>
                    </section>
                )
            }

            {/* ═══════════════════ CONTACT + MAP ═══════════════════ */}
            <section id="contact" style={{ padding: '7rem 2rem', maxWidth: 1000, margin: '0 auto' }}>
                <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
                    <div style={{ color: '#0055FF', fontSize: '0.8rem', fontWeight: 700, marginBottom: '1rem' }}>— {t('contact.title')} —</div>
                    <h2 style={{ fontWeight: 900, fontSize: 'clamp(1.8rem,4vw,2.8rem)', marginBottom: '0.8rem' }}>{t('contact.subtitle')}</h2>
                    <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '1.05rem' }}>
                        {t('contact.address')}
                    </p>
                </div>
                <div style={{ borderRadius: 22, overflow: 'hidden', border: '1px solid rgba(0, 85, 255,0.18)', boxShadow: '0 0 60px rgba(0,0,0,0.6)' }}>
                    <iframe
                        title="Localisation Saadcoches"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1618.973347596041!2d-5.8124438!3d35.7529719!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd0b817ebd4716e1%3A0xe0dd28bb15ebfce1!2sNour%20Coches!5e0!3m2!1sen!2sae!4v1700000000000!5m2!1sen!2sae"
                        width="100%" height="420"
                        style={{ display: 'block', border: 0, filter: 'invert(90%) hue-rotate(180deg) brightness(0.85)' }}
                        allowFullScreen loading="lazy"
                    />
                </div>
            </section>

            {/* ═══════════════════ FOOTER ═══════════════════ */}
            <footer style={{ background: '#050505', borderTop: '1px solid rgba(255,255,255,0.04)', padding: '3.5rem 2rem' }}>
                <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <div style={{ width: 50, height: 50, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <img src={logo} alt="Logo" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <div style={{ fontWeight: 900, fontSize: '1.2rem', letterSpacing: '1px', color: '#0055FF', lineHeight: 1.2 }}>{lang === 'ar' ? 'سعدكوشيس' : 'Saadcoches'}</div>
                            <div style={{ fontSize: '0.45rem', letterSpacing: '2px', color: 'rgba(255,255,255,0.25)', fontWeight: 700, textTransform: 'uppercase' }}>Luxury Car Rental - Tanger</div>
                        </div>
                    </div>
                    <div style={{ color: 'rgba(255,255,255,0.22)', fontSize: '0.8rem', letterSpacing: '2px' }}>{t('footer.about')}</div>
                    <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                        {[[IG, lang === 'ar' ? '📸 إنستجرام' : '📸 Instagram'], [FB, lang === 'ar' ? '📘 فيسبوك' : '📘 Facebook'], [WA(), lang === 'ar' ? '📲 واتساب' : '📲 WhatsApp']]
                            .filter(([href]) => href !== '#')
                            .map(([href, label]) => (
                                <a key={label} href={href} target="_blank" rel="noreferrer" style={{ color: 'rgba(255,255,255,0.35)', textDecoration: 'none', fontSize: '0.9rem', transition: 'color 0.3s' }}
                                    onMouseEnter={e => (e.currentTarget.style.color = '#0055FF')}
                                    onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.35)')}>
                                    {label}
                                </a>
                            ))}
                    </div>
                    <div style={{ color: 'rgba(255,255,255,0.15)', fontSize: '0.8rem' }}>© 2026 {lang === 'ar' ? 'سعدكوشيس' : 'Saadcoches'} · {t('footer.rights')} · {lang === 'ar' ? 'طنجة، المغرب' : 'Tangier, Morocco'}</div>
                </div>
            </footer>

            {/* ═══════════════════ FLOATING SOCIAL BUTTONS ═══════════════════ */}
            <div style={{
                position: 'fixed', bottom: '2rem',
                left: lang === 'ar' ? '2.2rem' : 'auto',
                right: lang !== 'ar' ? '2.2rem' : 'auto',
                zIndex: 900,
                display: 'flex', flexDirection: 'column', gap: '1rem',
                alignItems: 'center'
            }}>
                {/* Instagram */}
                <a href={IG} target="_blank" rel="noreferrer" title="Instagram"
                    style={{
                        width: 52, height: 52, borderRadius: '50%',
                        background: 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: '#fff', boxShadow: '0 6px 20px rgba(220,39,67,0.4)',
                        textDecoration: 'none', transition: 'all 0.3s',
                    }}
                    onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.transform = 'scale(1.12) translateY(-4px)'; el.style.boxShadow = '0 10px 28px rgba(220,39,67,0.6)'; }}
                    onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.transform = ''; el.style.boxShadow = '0 6px 20px rgba(220,39,67,0.4)'; }}>
                    <Instagram size={22} />
                </a>

                {/* Facebook */}
                <a href={FB} target="_blank" rel="noreferrer" title="Facebook"
                    style={{
                        width: 52, height: 52, borderRadius: '50%',
                        background: 'linear-gradient(135deg, #1877F2, #0C63D1)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: '#fff', boxShadow: '0 6px 20px rgba(24,119,242,0.4)',
                        textDecoration: 'none', transition: 'all 0.3s',
                    }}
                    onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.transform = 'scale(1.12) translateY(-4px)'; el.style.boxShadow = '0 10px 28px rgba(24,119,242,0.6)'; }}
                    onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.transform = ''; el.style.boxShadow = '0 6px 20px rgba(24,119,242,0.4)'; }}>
                    <Facebook size={22} />
                </a>

                {/* WhatsApp */}
                <a href={WA()} target="_blank" rel="noreferrer" title="WhatsApp"
                    style={{
                        width: 60, height: 60, borderRadius: '50%',
                        background: 'linear-gradient(135deg,#22c55e,#16a34a)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '1.6rem', boxShadow: '0 8px 24px rgba(34,197,94,0.5)',
                        textDecoration: 'none', transition: 'all 0.3s',
                    }}
                    onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.transform = 'scale(1.1) translateY(-4px)'; el.style.boxShadow = '0 12px 32px rgba(34,197,94,0.7)'; }}
                    onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.transform = ''; el.style.boxShadow = '0 8px 24px rgba(34,197,94,0.5)'; }}>
                    💬
                </a>
            </div>

            {/* ═══════════════════ PROMO MODAL ═══════════════════ */}
            {
                showPromoModal && (
                    <div style={{
                        position: 'fixed', inset: 0, zIndex: 10000,
                        background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(10px)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        padding: '2rem', animation: 'fadeIn 0.3s ease',
                    }} onClick={() => { setShowPromoModal(false); syncCarUrl(null); }}>

                        <div className="promo-modal-content" style={{
                            background: '#111', border: '1px solid rgba(0, 85, 255,0.3)',
                            borderRadius: 24, padding: '3rem 2rem', maxWidth: 1400, width: '100%',
                            position: 'relative', boxShadow: '0 30px 60px rgba(0,0,0,0.8)',
                            maxHeight: '90vh', overflowY: 'auto'
                        }} onClick={e => e.stopPropagation()}>


                            <button onClick={() => { setShowPromoModal(false); syncCarUrl(null); }} style={{
                                position: 'absolute', top: '1.5rem', left: t('dir') === 'rtl' ? '1.5rem' : 'auto', right: t('dir') !== 'rtl' ? '1.5rem' : 'auto',
                                background: 'rgba(255,255,255,0.05)', border: 'none',
                                width: 36, height: 36, borderRadius: '50%', color: '#fff',
                                fontSize: '1.2rem', cursor: 'pointer', transition: 'background 0.2s',
                            }} onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'} onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}>
                                ✕
                            </button>

                            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎁</div>
                                <h2 style={{
                                    fontWeight: 900, fontSize: 'clamp(1.5rem, 5vw, 2.2rem)',
                                    background: 'linear-gradient(90deg, #4D88FF, #0055FF)',
                                    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                                    marginBottom: '0.5rem', textTransform: 'uppercase'
                                }}>{t('promo.modalTitle')}</h2>
                                <p style={{ color: 'rgba(255,255,255,0.6)', maxWidth: 500, margin: '0 auto', lineHeight: 1.6 }}>
                                    {t('promo.modalDesc')}
                                </p>
                            </div>

                            <div className="promo-modal-grid" style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(4, 1fr)',
                                gap: '1.2rem',
                                animation: 'fadeInUp 1s ease both'
                            }}>            {db.promoCars.map((car: any, idx: number) => {
                                const normalCar = db?.fleet?.find((f: any) => L(f.name) === L(car.name));
                                const originalPrice = normalCar?.price || Math.round(car.price * 2);

                                return (
                                    <div key={car.id} className="promo-card" style={{
                                        background: '#1a1a1a',
                                        borderRadius: 18,
                                        border: '1px solid rgba(0, 85, 255,0.15)',
                                        overflow: 'hidden',
                                        position: 'relative',
                                        display: 'flex', flexDirection: 'column',
                                        animation: `fadeInUp 0.6s ${idx * 0.1}s ease both`
                                    }}>
                                        {/* Chic Promo Badge with Animation */}
                                        <div className="promo-badge shimmer-bg" style={{
                                            position: 'absolute', top: 18, right: -42,
                                            background: 'linear-gradient(135deg, #0033A0 0%, #4D88FF 50%, #0033A0 100%)',
                                            backgroundSize: '200% 100%',
                                            color: '#fff',
                                            padding: '5px 45px', fontWeight: 900, fontSize: '0.7rem',
                                            transform: 'rotate(45deg)', zIndex: 10,
                                            boxShadow: '0 4px 20px rgba(0, 85, 255,0.5)',
                                            textTransform: 'uppercase', letterSpacing: '1px',
                                            pointerEvents: 'none',
                                            border: '1px solid rgba(255,255,255,0.2)',
                                            animation: 'shimmer 2s infinite linear, pulse 2s infinite ease-in-out'
                                        }}>
                                            PROMO -40%
                                        </div>

                                        <div className="promo-card-img" style={{ width: '100%', height: 180, flexShrink: 0 }}>
                                            <CarImageSlider mainImg={car.img} extraImages={car.images} />
                                        </div>
                                        <div className="promo-card-info" style={{ padding: '1.2rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                                            <h3 style={{ fontWeight: 800, fontSize: '1.1rem', marginBottom: '0.2rem' }}>{L(car.name)}</h3>
                                            <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.8rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
                                                {L(car.subtitle)}

                                                {/* Status in Promo Modal */}
                                                <span style={{
                                                    display: 'inline-flex', alignItems: 'center', gap: '6px',
                                                    padding: '2px 8px', borderRadius: 20,
                                                    background: car.count > 0 ? 'rgba(34,197,94,0.1)' : 'rgba(239,68,68,0.1)',
                                                    border: `1px solid ${car.count > 0 ? 'rgba(34,197,94,0.2)' : 'rgba(239,68,68,0.2)'}`,
                                                    fontSize: '0.6rem', fontWeight: 800,
                                                    color: car.count > 0 ? '#4ade80' : '#f87171',
                                                    whiteSpace: 'nowrap'
                                                }}>
                                                    <span style={{
                                                        width: 5, height: 5, borderRadius: '50%',
                                                        background: car.count > 0 ? '#22c55e' : '#ef4444',
                                                        boxShadow: `0 0 6px ${car.count > 0 ? '#22c55e' : '#ef4444'}`,
                                                        animation: car.count > 0 ? 'pulse 2s infinite' : 'none'
                                                    }} />
                                                    {car.count > 0 ? t('fleet.stock') : t('fleet.outOfStock')}
                                                </span>
                                            </p>


                                            <div className="promo-price-box" style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: '0.8rem', background: 'rgba(0, 85, 255,0.05)', padding: '6px 10px', borderRadius: 10, border: '1px solid rgba(0, 85, 255,0.1)' }}>
                                                <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#4D88FF', animation: 'pulse 1.5s infinite' }} />
                                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                    <span style={{ fontWeight: 900, fontSize: '1.4rem', color: '#4D88FF', lineHeight: 1 }}>{formatPrice(car.price)} {currency}</span>
                                                    <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.75rem', textDecoration: 'line-through' }}>{formatPrice(originalPrice)} {currency}</span>
                                                </div>
                                            </div>

                                            <div className="specs-box" style={{ display: 'flex', gap: '0.4rem', marginBottom: '1.2rem', flexWrap: 'wrap' }}>
                                                {(car.specs || []).slice(0, 3).map((s: any) => (
                                                    <span key={L(s.label)} style={{ background: 'rgba(255,255,255,0.05)', padding: '0.2rem 0.5rem', borderRadius: 4, fontSize: '0.7rem', color: 'rgba(255,255,255,0.6)' }}>
                                                        {L(s.value)}
                                                    </span>
                                                ))}
                                            </div>


                                            <button
                                                disabled={!car.count || car.count <= 0}
                                                onClick={() => {
                                                    if (!car.count || car.count <= 0) return;
                                                    setBookingCar(car);
                                                    setBookingDays(5); // Promos always follow the 5-day rule
                                                    setCustomerName('');
                                                    setCustomerPhone('');
                                                    setShowPromoModal(false);
                                                }}
                                                style={{
                                                    display: 'block', width: '100%', border: 'none',
                                                    cursor: (!car.count || car.count <= 0) ? 'not-allowed' : 'pointer',
                                                    background: (!car.count || car.count <= 0) ? '#555' : 'linear-gradient(45deg,#0033A0,#0055FF)', color: '#fff',
                                                    padding: '0.7rem', borderRadius: 8, fontWeight: 800, fontSize: '0.9rem',
                                                    transition: 'all 0.3s',
                                                    opacity: (!car.count || car.count <= 0) ? 0.6 : 1
                                                }}
                                                onMouseEnter={e => { if (car.count > 0) e.currentTarget.style.transform = 'scale(1.02)'; }}
                                                onMouseLeave={e => e.currentTarget.style.transform = ''}
                                            >
                                                {(!car.count || car.count <= 0) ? (lang === 'ar' ? '🚫 غير متوفر' : lang === 'fr' ? '🚫 Indisponible' : '🚫 Unavailable') : t('fleet.book')}
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}

                            </div>
                        </div>
                    </div>
                )
            }

            {/* ═══════════════════ CATALOG / GALLERY MODAL ═══════════════════ */}
            {
                galleryCar && (() => {
                    const allImgs = [galleryCar.img, ...(galleryCar.images || [])].filter(Boolean);
                    return allImgs.length > 0 && (
                        <div style={{
                            position: 'fixed', inset: 0, zIndex: 10005,
                            background: 'rgba(0,0,0,0.97)', backdropFilter: 'blur(20px)',
                            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                            padding: '1rem', animation: 'fadeIn 0.25s ease',
                        }} onClick={() => setGalleryCar(null)}>

                            {/* Close Button */}
                            <button onClick={() => setGalleryCar(null)} style={{
                                position: 'absolute', top: '1rem', right: '1rem',
                                background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.15)',
                                width: 44, height: 44, borderRadius: '50%', color: '#fff',
                                fontSize: '1.3rem', cursor: 'pointer', transition: 'all 0.2s',
                                zIndex: 10010
                            }} onMouseEnter={e => { e.currentTarget.style.background = 'rgba(0, 85, 255,0.4)'; }} onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.12)'; }}>✕</button>

                            {/* Car Name & Counter */}
                            <div style={{ textAlign: 'center', marginBottom: '1rem', zIndex: 1 }} onClick={e => e.stopPropagation()}>
                                <h2 style={{ color: '#0055FF', fontSize: '1.6rem', fontWeight: 900, margin: 0 }}>{L(galleryCar.name)}</h2>
                                <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.85rem', marginTop: 4 }}>
                                    {currentImgIndex + 1} / {allImgs.length} &nbsp;·&nbsp;
                                    <span style={{ fontSize: '0.75rem' }}>← → or tap arrows to navigate</span>
                                </div>
                            </div>

                            {/* Main Image Viewer */}
                            <div
                                style={{ position: 'relative', width: '100%', maxWidth: 1000, flex: '1 1 auto', maxHeight: '65vh', background: '#050505', borderRadius: 18, overflow: 'hidden', border: '1px solid rgba(0, 85, 255,0.15)', boxShadow: '0 30px 80px rgba(0,0,0,0.8)' }}
                                onClick={e => e.stopPropagation()}
                                onTouchStart={e => { touchStartX.current = e.touches[0].clientX; }}
                                onTouchEnd={e => {
                                    const diff = touchStartX.current - e.changedTouches[0].clientX;
                                    if (Math.abs(diff) > 50) navigateGallery(diff > 0 ? 'right' : 'left', allImgs.length);
                                }}
                            >
                                <img
                                    key={currentImgIndex}
                                    src={allImgs[currentImgIndex].startsWith('http') ? allImgs[currentImgIndex] : IMAGE_BASE + allImgs[currentImgIndex]}
                                    alt={`${L(galleryCar.name)} - ${currentImgIndex + 1}`}
                                    style={{
                                        width: '100%', height: '100%', objectFit: 'contain',
                                        animation: gallerySliding === 'right' ? 'slideOutLeft 0.2s ease' : gallerySliding === 'left' ? 'slideOutRight 0.2s ease' : 'slideIn 0.25s ease',
                                    }}
                                />

                                {allImgs.length > 1 && (<>
                                    <button
                                        onClick={() => navigateGallery('left', allImgs.length)}
                                        style={{ position: 'absolute', left: '0.8rem', top: '50%', transform: 'translateY(-50%)', background: 'rgba(0,0,0,0.7)', border: '1px solid rgba(255,255,255,0.1)', width: 52, height: 52, borderRadius: '50%', color: '#fff', fontSize: '1.4rem', cursor: 'pointer', transition: 'all 0.2s', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                        onMouseEnter={e => { e.currentTarget.style.background = 'rgba(0, 85, 255,0.7)'; }}
                                        onMouseLeave={e => { e.currentTarget.style.background = 'rgba(0,0,0,0.7)'; }}
                                    >‹</button>
                                    <button
                                        onClick={() => navigateGallery('right', allImgs.length)}
                                        style={{ position: 'absolute', right: '0.8rem', top: '50%', transform: 'translateY(-50%)', background: 'rgba(0,0,0,0.7)', border: '1px solid rgba(255,255,255,0.1)', width: 52, height: 52, borderRadius: '50%', color: '#fff', fontSize: '1.4rem', cursor: 'pointer', transition: 'all 0.2s', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                        onMouseEnter={e => { e.currentTarget.style.background = 'rgba(0, 85, 255,0.7)'; }}
                                        onMouseLeave={e => { e.currentTarget.style.background = 'rgba(0,0,0,0.7)'; }}
                                    >›</button>
                                </>)}

                                {/* Dot indicators */}
                                {allImgs.length > 1 && (
                                    <div style={{ position: 'absolute', bottom: '0.8rem', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 6 }}>
                                        {allImgs.map((_: string, idx: number) => (
                                            <div key={idx} onClick={() => setCurrentImgIndex(idx)} style={{ width: idx === currentImgIndex ? 20 : 8, height: 8, borderRadius: 4, background: idx === currentImgIndex ? '#0055FF' : 'rgba(255,255,255,0.3)', cursor: 'pointer', transition: 'all 0.3s' }} />
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Thumbnail Strip */}
                            {allImgs.length > 1 && (
                                <div style={{ display: 'flex', gap: '0.6rem', marginTop: '1rem', maxWidth: 1000, overflowX: 'auto', padding: '0.4rem 0', width: '100%' }} onClick={e => e.stopPropagation()}>
                                    {allImgs.map((img: string, idx: number) => (
                                        <img
                                            key={idx}
                                            src={img.startsWith('http') ? img : IMAGE_BASE + img}
                                            alt={`Thumb ${idx}`}
                                            onClick={() => setCurrentImgIndex(idx)}
                                            style={{
                                                flexShrink: 0,
                                                width: 90, height: 62, objectFit: 'cover', borderRadius: 10, cursor: 'pointer',
                                                border: idx === currentImgIndex ? '2.5px solid #0055FF' : '2.5px solid transparent',
                                                opacity: idx === currentImgIndex ? 1 : 0.45,
                                                transition: 'all 0.25s',
                                                transform: idx === currentImgIndex ? 'scale(1.06)' : 'scale(1)',
                                            }}
                                        />
                                    ))}
                                </div>
                            )}

                            <p style={{ color: 'rgba(255,255,255,0.2)', fontSize: '0.72rem', marginTop: '0.8rem' }}>Click outside to close</p>
                        </div>
                    );
                })()
            }


            {/* ═══════════════════ BOOKING MODAL ═══════════════════ */}
            {
                bookingCar && (
                    <div style={{
                        position: 'fixed', inset: 0, zIndex: 10010,
                        background: 'rgba(0,0,0,0.9)', backdropFilter: 'blur(15px)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        padding: '0.5rem', animation: 'fadeIn 0.3s ease',
                    }} onClick={() => { setBookingCar(null); syncCarUrl(null); }}>

                        <div style={{
                            background: '#111', border: '1px solid rgba(0, 85, 255,0.3)',
                            borderRadius: 18, padding: '0.8rem 1.2rem', maxWidth: 400, width: '100%',
                            position: 'relative', boxShadow: '0 20px 40px rgba(0,0,0,0.8)',
                            maxHeight: '95vh', overflowY: 'auto',
                        }} onClick={e => e.stopPropagation()}>

                            <button onClick={() => { setBookingCar(null); syncCarUrl(null); }} style={{
                                position: 'absolute', top: '0.6rem', right: t('dir') === 'rtl' ? 'auto' : '0.6rem', left: t('dir') === 'rtl' ? '0.6rem' : 'auto',
                                background: 'rgba(255,255,255,0.05)', border: 'none',
                                width: 26, height: 26, borderRadius: '50%', color: '#fff',
                                fontSize: '0.8rem', cursor: 'pointer', transition: 'background 0.2s',
                                display: 'flex', alignItems: 'center', justifyContent: 'center'
                            }} onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'} onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}>
                                ✕
                            </button>

                            <div style={{ textAlign: 'center', marginBottom: '0.5rem' }}>
                                <div style={{ fontSize: '1.4rem', marginBottom: '0.15rem' }}>🎫</div>
                                <h2 style={{ fontWeight: 900, fontSize: '1.1rem', color: '#0055FF', marginBottom: '0.1rem' }}>{t('booking.title')}</h2>
                                <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.75rem', margin: 0 }}>{L(bookingCar.name)}</p>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
                                {/* Name & Phone side by side */}
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.4rem' }}>
                                    <div>
                                        <label style={{ display: 'block', fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)', marginBottom: '0.2rem' }}>{t('booking.name')}</label>
                                        <input
                                            type="text" placeholder={t('booking.namePlh')}
                                            value={customerName} onChange={e => setCustomerName(e.target.value)}
                                            style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, padding: '0.4rem 0.6rem', color: '#fff', fontSize: '0.8rem', outline: 'none', transition: 'border 0.3s', textAlign: t('dir') === 'rtl' ? 'right' : 'left' }}
                                            onFocus={e => e.target.style.borderColor = '#0055FF'} onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                                        />
                                    </div>
                                    <div>
                                        <label style={{ display: 'block', fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)', marginBottom: '0.2rem' }}>{t('booking.phone')}</label>
                                        <input
                                            type="text" placeholder="+212 ..." value={customerPhone}
                                            onChange={e => setCustomerPhone(e.target.value)}
                                            style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, padding: '0.4rem 0.6rem', color: '#fff', fontSize: '0.8rem', outline: 'none', direction: 'ltr', textAlign: 'left' }}
                                            onFocus={e => e.target.style.borderColor = '#0055FF'} onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                                        />
                                    </div>
                                </div>

                                {/* Start Date */}
                                <div>
                                    <label style={{ display: 'block', fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)', marginBottom: '0.2rem' }}>
                                        📅 {t('booking.startDate')}
                                    </label>
                                    <input
                                        type="date"
                                        value={bookingStartDate}
                                        min={new Date().toISOString().split('T')[0]}
                                        onChange={e => setBookingStartDate(e.target.value)}
                                        style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, padding: '0.4rem 0.6rem', color: '#fff', fontSize: '0.8rem', outline: 'none', direction: 'ltr', colorScheme: 'dark' }}
                                        onFocus={e => e.target.style.borderColor = '#0055FF'} onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                                    />
                                </div>

                                {/* Number of Days */}
                                <div>
                                    <label style={{ display: 'block', fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)', marginBottom: '0.2rem' }}>{t('booking.daysLabel') || t('booking.days')}</label>
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.6rem', flexDirection: t('dir') === 'rtl' ? 'row' : 'row-reverse' }}>
                                        <button onClick={() => setBookingDays(d => Math.max(db?.promoCars?.some((p: any) => L(p.name) === L(bookingCar?.name)) ? 5 : 1, d + 1))} style={{ width: 34, height: 34, borderRadius: 8, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', cursor: 'pointer', fontSize: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>+</button>
                                        <div style={{ flex: 1, textAlign: 'center', fontSize: '1.15rem', fontWeight: 900, color: '#0055FF', direction: 'rtl' }}>{Math.max(db?.promoCars?.some((p: any) => L(p.name) === L(bookingCar?.name)) ? 5 : 1, bookingDays)} {lang === 'ar' ? 'يوم' : 'jours'}</div>
                                        <button onClick={() => {
                                            const isPromo = db?.promoCars?.some((p: any) => L(p.name) === L(bookingCar?.name));
                                            const minDays = isPromo ? 5 : 1;
                                            setBookingDays(d => Math.max(minDays, d - 1));
                                        }} style={{ width: 34, height: 34, borderRadius: 8, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', cursor: 'pointer', fontSize: '1.2rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>−</button>
                                    </div>
                                    {db?.promoCars?.some((p: any) => L(p.name) === L(bookingCar?.name)) && (
                                        <div style={{ color: '#4D88FF', fontSize: '0.65rem', marginTop: '0.2rem', textAlign: 'center', fontWeight: 700 }}>
                                            {lang === 'ar' ? '* العرض الترويجي يتطلب كراء 5 أيام على الأقل' : '* La promotion nécessite un minimum de 5 jours'}
                                        </div>
                                    )}
                                </div>

                                {/* Date summary + Price in one row */}
                                {(() => {
                                    const endD = new Date(bookingStartDate);
                                    endD.setDate(endD.getDate() + bookingDays);
                                    const endStr = endD.toLocaleDateString(lang === 'ar' ? 'ar-MA' : lang === 'fr' ? 'fr-FR' : 'en-GB', { weekday: 'short', day: '2-digit', month: 'short', year: 'numeric' });
                                    const startStr = new Date(bookingStartDate).toLocaleDateString(lang === 'ar' ? 'ar-MA' : lang === 'fr' ? 'fr-FR' : 'en-GB', { weekday: 'short', day: '2-digit', month: 'short', year: 'numeric' });
                                    return (
                                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.4rem' }}>
                                            <div style={{ background: 'rgba(0, 85, 255,0.04)', border: '1px solid rgba(0, 85, 255,0.2)', borderRadius: 10, padding: '0.5rem 0.6rem' }}>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 6 }}>
                                                    <div style={{ textAlign: 'center', flex: 1 }}>
                                                        <div style={{ fontSize: '0.55rem', color: 'rgba(255,255,255,0.35)', fontWeight: 800, textTransform: 'uppercase', marginBottom: 1 }}>
                                                            {lang === 'ar' ? 'الاستلام' : lang === 'fr' ? 'Départ' : 'Start'}
                                                        </div>
                                                        <div style={{ fontWeight: 800, color: '#0055FF', fontSize: '0.68rem' }}>{startStr}</div>
                                                    </div>
                                                    <div style={{ color: 'rgba(255,255,255,0.2)', fontSize: '0.8rem' }}>→</div>
                                                    <div style={{ textAlign: 'center', flex: 1 }}>
                                                        <div style={{ fontSize: '0.55rem', color: 'rgba(255,255,255,0.35)', fontWeight: 800, textTransform: 'uppercase', marginBottom: 1 }}>
                                                            {lang === 'ar' ? 'الإرجاع' : lang === 'fr' ? 'Retour' : 'Return'}
                                                        </div>
                                                        <div style={{ fontWeight: 800, color: '#fff', fontSize: '0.68rem' }}>{endStr}</div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div style={{ background: 'rgba(0, 85, 255,0.05)', border: '1px dashed rgba(0, 85, 255,0.3)', borderRadius: 10, padding: '0.5rem 0.6rem', textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                                <div style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.5)', marginBottom: '0.1rem' }}>{t('booking.total')}</div>
                                                <div style={{ fontSize: '1.15rem', fontWeight: 900, color: '#0055FF' }}>{formatPrice(bookingCar.price * bookingDays)} {currency}</div>
                                            </div>
                                        </div>
                                    );
                                })()}

                                <button
                                    onClick={() => {
                                        if (!customerName || !customerPhone) { alert(t('booking.error')); return; }
                                        const isPromo = db?.promoCars?.some((p: any) => L(p.name) === L(bookingCar?.name));
                                        const actualDays = Math.max(isPromo ? 5 : 1, bookingDays);
                                        const endD = new Date(bookingStartDate);
                                        endD.setDate(endD.getDate() + actualDays);
                                        const fmtDate = (d: Date) => d.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' });
                                        const msg = encodeURIComponent(t('booking.whatsapp')
                                            .replace('{car}', L(bookingCar.name))
                                            .replace('{name}', customerName)
                                            .replace('{phone}', customerPhone)
                                            .replace('{startDate}', fmtDate(new Date(bookingStartDate)))
                                            .replace('{endDate}', fmtDate(endD))
                                            .replace('{days}', bookingDays.toString())
                                            .replace('{price}', `${formatPrice(bookingCar.price * bookingDays)} ${currency}`)
                                        );
                                        const targetPhone = db?.socialLinks?.whatsapp || db.phones.phone1;
                                        window.open(`https://wa.me/${targetPhone}?text=${msg}`, '_blank');
                                        setBookingCar(null);
                                    }}
                                    style={{ padding: '0.6rem', borderRadius: 10, border: 'none', background: 'linear-gradient(45deg,#0033A0,#0055FF)', color: '#fff', fontWeight: 800, fontSize: '0.85rem', cursor: 'pointer', boxShadow: '0 6px 14px rgba(0, 85, 255,0.2)', transition: 'all 0.3s' }}
                                    onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                                    onMouseLeave={e => e.currentTarget.style.transform = ''}
                                >
                                    {t('booking.submit')}
                                </button>
                            </div>
                        </div>
                    </div>
                )
            }

            {/* ═══════════════════ CAR FOR SALE DETAIL MODAL ═══════════════════ */}
            {
                selectedSaleCar && (() => {
                    const car = selectedSaleCar;
                    const phone = db?.socialLinks?.whatsapp || db?.phones?.phone1 || '';
                    const msg = encodeURIComponent(lang === 'ar'
                        ? `مرحبا! أود الاستفسار عن شراء سيارة ${typeof car.name === 'object' ? car.name.ar : car.name} (${car.year}) - ${car.salePrice?.toLocaleString()} درهم`
                        : `Bonjour! Je suis intéressé par l'achat de ${typeof car.name === 'object' ? car.name.fr : car.name} (${car.year}) - ${car.salePrice?.toLocaleString()} DH`);
                    const allImgs = [car.img, ...(car.images || [])].filter(Boolean);
                    const conditionMap: any = { excellent: lang === 'ar' ? 'ممتازة' : 'Excellent', good: lang === 'ar' ? 'جيدة' : 'Bon', fair: lang === 'ar' ? 'مقبولة' : 'Correct' };
                    return (
                        <div style={{
                            position: 'fixed', inset: 0, zIndex: 10020,
                            background: 'rgba(0,0,0,0.92)', backdropFilter: 'blur(15px)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            padding: '1rem', animation: 'fadeIn 0.3s ease',
                        }} onClick={() => setSelectedSaleCar(null)}>
                            <div style={{
                                background: '#111', border: '1px solid rgba(34,197,94,0.2)',
                                borderRadius: 24, maxWidth: 800, width: '100%',
                                position: 'relative', boxShadow: '0 30px 60px rgba(0,0,0,0.8)',
                                maxHeight: '92vh', overflowY: 'auto',
                                animation: 'fadeInUp 0.4s ease'
                            }} onClick={e => e.stopPropagation()}>
                                {/* Close */}
                                <button onClick={() => setSelectedSaleCar(null)} style={{
                                    position: 'absolute', top: '1rem', right: '1rem', zIndex: 10,
                                    background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.1)',
                                    width: 36, height: 36, borderRadius: '50%', color: '#fff',
                                    fontSize: '1.1rem', cursor: 'pointer',
                                }}>✕</button>

                                {/* Hero Image */}
                                <div style={{ position: 'relative', height: 280 }}>
                                    {allImgs.length > 0 ? (
                                        <img src={allImgs[0].startsWith('http') ? allImgs[0] : IMAGE_BASE + allImgs[0]} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    ) : (
                                        <div style={{ width: '100%', height: '100%', background: '#0a0a0a', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#333', fontSize: '4rem' }}>🏷️</div>
                                    )}
                                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, #111 0%, transparent 60%)' }} />
                                    <div style={{
                                        position: 'absolute', top: 14, left: 14,
                                        background: 'linear-gradient(45deg, #15803d, #22c55e)',
                                        color: '#fff', padding: '5px 14px', borderRadius: 20,
                                        fontSize: '0.75rem', fontWeight: 900, letterSpacing: 1,
                                    }}>{lang === 'ar' ? '🏷️ للبيع' : '🏷️ À VENDRE'}</div>
                                    <div style={{ position: 'absolute', bottom: '1.5rem', left: '1.5rem' }}>
                                        <div style={{ fontWeight: 900, fontSize: '1.8rem', color: '#fff', textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>{L(car.name)}</div>
                                        <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem', fontWeight: 600 }}>{car.year} · {car.engineSize || ''}</div>
                                    </div>
                                </div>

                                {/* Content */}
                                <div style={{ padding: '1.5rem 2rem 2rem' }}>
                                    {/* Price banner */}
                                    <div style={{
                                        background: 'linear-gradient(135deg, rgba(34,197,94,0.08), rgba(34,197,94,0.02))',
                                        border: '1px solid rgba(34,197,94,0.2)',
                                        borderRadius: 16, padding: '1rem 1.5rem',
                                        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                                        marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem'
                                    }}>
                                        <div>
                                            <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.35)', fontWeight: 800, textTransform: 'uppercase', marginBottom: 2 }}>{lang === 'ar' ? 'ثمن البيع' : 'Prix de vente'}</div>
                                            <div style={{ fontWeight: 900, fontSize: '2rem', color: '#22c55e' }}>{car.salePrice?.toLocaleString()} <span style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.4)' }}>DH</span></div>
                                        </div>
                                        <a href={`https://wa.me/${phone}?text=${msg}`} target="_blank" rel="noreferrer" style={{
                                            background: 'linear-gradient(45deg, #15803d, #22c55e)', color: '#fff',
                                            padding: '0.8rem 1.6rem', borderRadius: 12, textDecoration: 'none',
                                            fontWeight: 800, fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '6px',
                                            boxShadow: '0 8px 20px rgba(34,197,94,0.3)', transition: 'all 0.2s'
                                        }}>
                                            📲 {lang === 'ar' ? 'استفسر عبر واتساب' : 'Contacter via WhatsApp'}
                                        </a>
                                    </div>

                                    {/* Description */}
                                    {typeof car.description === 'object' && car.description[lang] && (
                                        <p style={{ color: 'rgba(255,255,255,0.55)', lineHeight: 1.8, marginBottom: '1.5rem', fontSize: '0.95rem' }}>{car.description[lang]}</p>
                                    )}

                                    {/* Spec Grid */}
                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.8rem', marginBottom: '1.5rem' }}>
                                        {[
                                            ['📏', lang === 'ar' ? 'الكيلومتراج' : 'Kilométrage', `${car.km?.toLocaleString()} km`],
                                            ['📅', lang === 'ar' ? 'سنة الموديل' : 'Année', car.year],
                                            ['⚙️', lang === 'ar' ? 'ناقل الحركة' : 'Transmission', car.transmission === 'auto' ? 'Automatique' : 'Manuelle'],
                                            ['⛽', lang === 'ar' ? 'الوقود' : 'Carburant', car.fuel === 'diesel' ? 'Diesel' : car.fuel === 'petrol' ? 'Essence' : 'Diesel/Essence'],
                                            ['🔧', lang === 'ar' ? 'المحرك' : 'Moteur', car.engineSize || '—'],
                                            ['✨', lang === 'ar' ? 'الحالة' : 'Condition', conditionMap[car.condition] || car.condition],
                                            ['👤', lang === 'ar' ? 'المالك' : 'Propriétaire', car.firstOwner ? (lang === 'ar' ? 'مالك أول' : '1ère main') : (lang === 'ar' ? 'مالك ثاني+' : '2ème main+')],
                                            ['📋', lang === 'ar' ? 'المراقبة التقنية' : 'CT', car.technicalControl ? '✅' : '❌'],
                                            ['👥', lang === 'ar' ? 'المقاعد' : 'Places', car.places || 5],
                                        ].map(([icon, label, value]) => (
                                            <div key={label as string} style={{
                                                background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)',
                                                borderRadius: 12, padding: '0.7rem 0.8rem',
                                            }}>
                                                <div style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.3)', fontWeight: 800, marginBottom: 3 }}>{icon} {label}</div>
                                                <div style={{ fontWeight: 800, fontSize: '0.9rem', color: '#fff' }}>{value}</div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Gallery thumbnails */}
                                    {allImgs.length > 1 && (
                                        <div style={{ marginBottom: '1.5rem' }}>
                                            <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.3)', fontWeight: 800, marginBottom: '0.5rem' }}>📸 {lang === 'ar' ? 'صور إضافية' : 'Photos'} ({allImgs.length})</div>
                                            <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', paddingBottom: '0.5rem' }}>
                                                {allImgs.map((img: string, idx: number) => (
                                                    <img key={idx} src={img.startsWith('http') ? img : IMAGE_BASE + img} alt="" style={{
                                                        width: 90, height: 64, objectFit: 'cover', borderRadius: 10, flexShrink: 0,
                                                        border: '2px solid rgba(34,197,94,0.2)', cursor: 'pointer', transition: 'all 0.2s'
                                                    }}
                                                        onClick={() => { openGallery({ ...car, name: car.name }, idx); setSelectedSaleCar(null); }}
                                                        onMouseEnter={e => e.currentTarget.style.borderColor = '#22c55e'}
                                                        onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(34,197,94,0.2)'}
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* CTA Bottom */}
                                    <a href={`https://wa.me/${phone}?text=${msg}`} target="_blank" rel="noreferrer" style={{
                                        display: 'block', width: '100%', textAlign: 'center',
                                        background: 'linear-gradient(45deg, #15803d, #22c55e)', color: '#fff',
                                        padding: '0.9rem', borderRadius: 12, textDecoration: 'none',
                                        fontWeight: 900, fontSize: '1rem',
                                        boxShadow: '0 10px 24px rgba(34,197,94,0.25)', transition: 'all 0.2s'
                                    }}>📲 {lang === 'ar' ? 'أتصل الآن للشراء' : lang === 'fr' ? 'Appelez maintenant pour acheter' : 'Call now to buy'}</a>
                                </div>
                            </div>
                        </div>
                    );
                })()
            }

            {/* ═══════════════════ CSS KEYFRAMES & FONTS ═══════════════════ */}
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;900&family=Inter:wght@400;600;700;900&display=swap');
                @keyframes shimmer { 0%{background-position:-200% center} 100%{background-position:200% center} }
                @keyframes spinRing { 0%{transform:rotate(0deg)} 100%{transform:rotate(360deg)} }
                @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.25} }
                @keyframes fadeIn { from{opacity:0} to{opacity:1} }
                @keyframes fadeInDown { from{opacity:0;transform:translateY(-16px)} to{opacity:1;transform:none} }
                @keyframes fadeInRight { from{opacity:0;transform:translateX(24px)} to{opacity:1;transform:none} }
                @keyframes fadeInLeft { from{opacity:0;transform:translateX(-24px)} to{opacity:1;transform:none} }
                @keyframes fadeInUp { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:none} }
                @keyframes bounceSmall { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-5px)} }
                @keyframes marquee { 
                  0% { transform: ${t('dir') === 'rtl' ? 'translateX(-100%)' : 'translateX(100%)'} } 
                  100% { transform: ${t('dir') === 'rtl' ? 'translateX(100%)' : 'translateX(-100%)'} } 
                }
                @keyframes marqueeMobile { 0% { transform: translateX(0) } 100% { transform: translateX(-50%) } }
                @keyframes glow { 0%,100%{ opacity: 1; transform: scale(1) } 50%{ opacity: 0.7; transform: scale(1.1) } }
                @keyframes slideIn { from{opacity:0;transform:scale(0.97)} to{opacity:1;transform:scale(1)} }
                @keyframes slideOutLeft { from{opacity:1;transform:translateX(0)} to{opacity:0;transform:translateX(-40px)} }
                @keyframes slideOutRight { from{opacity:1;transform:translateX(0)} to{opacity:0;transform:translateX(40px)} }
                * { box-sizing: border-box; margin: 0; padding: 0; }

                html { scroll-behavior: smooth; }
                body { overflow-x: hidden; font-family: ${t('font')}; }
                ::-webkit-scrollbar { width: 6px; }
                ::-webkit-scrollbar-track { background: #0a0a0a; }
                ::-webkit-scrollbar-thumb { background: #0055FF; border-radius: 3px; }

                /* ─── RESPONSIVE OVERRIDES ─── */
                .hide-on-mobile { display: block; }

                @media (max-width: 1024px) {
                  .hero-content { padding-top: 160px !important; }
                  .fleet-grid { grid-template-columns: repeat(3, 1fr) !important; }
                }

                @media (max-width: 1150px) {
                  .desktop-nav { display: none !important; }
                  .mobile-toggle { display: flex !important; }
                  .process-line { display: none; }
                  .hide-on-mobile { display: none !important; }
                  
                  section { padding: 3rem 0.8rem !important; }
                  .hero-section { height: auto !important; min-height: 100vh !important; display: block !important; }
                  .hero-content { padding: 140px 1.2rem 60px !important; text-align: center; max-width: 100% !important; margin: 0 auto; }
                  .hero-content p { margin: 1.5rem auto !important; font-size: 1rem !important; }
                  .hero-content .flex-container { justify-content: center !important; }
                  .hero-stats { justify-content: center !important; gap: 1.5rem !important; }
                  .hero-stats-container { position: relative !important; margin-top: 2rem !important; padding-bottom: 3rem !important; gap: 1rem !important; }
                  .hero-stats-container div div:first-of-type { font-size: 1.6rem !important; }
                  .hero-stats-container div div:last-of-type { font-size: 0.7rem !important; }
                  .hero-content { padding-bottom: 0 !important; }

                  .fleet-grid { grid-template-columns: 1fr 1fr !important; gap: 0.7rem !important; }
                  .fleet-card { flex-direction: column !important; padding: 0 !important; height: 100% !important; }
                  .fleet-card-img { width: 100% !important; height: 140px !important; }
                  .fleet-card-info { padding: 0.7rem !important; flex: 1 !important; display: flex !important; flex-direction: column !important; }
                  .fleet-card-info .header-flex { flex-direction: column !important; align-items: flex-start !important; gap: 4px !important; }
                  .fleet-card-info h3 { font-size: 0.82rem !important; min-height: 2.2em !important; display: -webkit-box !important; -webkit-line-clamp: 2 !important; -webkit-box-orient: vertical !important; overflow: hidden !important; line-height: 1.15 !important; }
                  .fleet-card-info .avail-badge { font-size: 0.55rem !important; padding: 2px 8px !important; margin: 0 !important; width: fit-content !important; }
                  .fleet-card-info .avail-badge span { width: 6px !important; height: 6px !important; }
                  .fleet-card-info .stars-row { font-size: 0.65rem !important; margin-bottom: 4px !important; }
                  .fleet-card-info .specs-col { font-size: 0.65rem !important; gap: 2px !important; margin-bottom: 6px !important; }
                  .fleet-card-info .icons-row { font-size: 0.65rem !important; gap: 6px !important; margin-bottom: 8px !important; }
                  .fleet-card-info .price-row { margin-bottom: 8px !important; }
                  .fleet-card-info .price-row .price-label { font-size: 0.6rem !important; display: block !important; }
                  .fleet-card-info .price-row .price-val { font-size: 1.1rem !important; }
                  .fleet-card-info .price-row .price-unit { font-size: 0.6rem !important; }
                  .fleet-card-info .btn-row { gap: 4px !important; margin-top: auto !important; }
                  .fleet-card-info .btn-row button { padding: 0.5rem 0.4rem !important; font-size: 0.7rem !important; border-radius: 6px !important; height: 34px !important; display: flex !important; align-items: center !important; justify-content: center !important; }
                  input[type="date"] { color-scheme: dark; }
                  
                  .services-grid { grid-template-columns: 1fr 1fr !important; }
                  .reviews-grid { grid-template-columns: 1fr !important; }
                   
                  .promo-modal-grid { grid-template-columns: 1fr 1fr !important; gap: 0.6rem !important; }
                  .promo-card { height: 100% !important; }
                  .promo-card-img { height: 130px !important; }
                  .promo-card-info { padding: 0.7rem !important; }
                  .promo-card-info h3 { font-size: 0.85rem !important; min-height: 2.4em !important; line-height: 1.2 !important; margin-bottom: 4px !important; display: -webkit-box !important; -webkit-line-clamp: 2 !important; -webkit-box-orient: vertical !important; overflow: hidden !important; }
                  .promo-card-info p { font-size: 0.7rem !important; margin-bottom: 8px !important; }
                  .promo-card-info .promo-price-box { margin-bottom: 8px !important; gap: 4px !important; }
                  .promo-card-info .promo-price-box span:nth-of-type(2) { font-size: 1.1rem !important; }
                  .promo-card-info .promo-price-box span:nth-of-type(3) { font-size: 0.7rem !important; }
                  .promo-card-info .specs-box { display: none !important; }
                  .promo-card-info button { padding: 0.65rem !important; font-size: 0.75rem !important; margin-top: auto !important; }
                  .promo-badge { font-size: 0.5rem !important; padding: 2px 20px !important; top: 10px !important; right: -25px !important; }
                   
                  .why-us-flex { flex-direction: column !important; gap: 2.5rem !important; }
                  .why-us-flex > div { flex: 1 1 100% !important; }
                  
                  .modal-content { padding: 1.5rem 1rem !important; max-width: 95vw !important; }
                  .promo-modal-content { padding: 1.5rem 0.8rem !important; }
                  .promo-grid { grid-template-columns: 1fr !important; }
                  .search-age-field { display: none !important; }
                  .search-date-field { flex: 1 1 100% !important; border-right: none !important; border-bottom: 1px solid #ddd !important; padding: 1rem !important; }
                  .search-btn-field { flex: 1 1 100% !important; padding: 1.2rem !important; }
                }

                /* ─── PHONE-SPECIFIC OVERRIDES (≤600px) ─── */
                @media (max-width: 600px) {
                  section { padding: 2.5rem 0.6rem !important; }
                  
                  .hero-content { padding: 120px 1rem 40px !important; }
                  .hero-content h1 { font-size: 2.2rem !important; letter-spacing: 0 !important; }
                  .hero-content p { font-size: 0.9rem !important; margin-bottom: 2rem !important; }
                  .hero-stats-container { gap: 0.8rem !important; padding: 1.5rem 0.5rem !important; }
                  .hero-stats-container > div { gap: 0.8rem !important; }
                  .hero-stats-container div div:first-of-type { font-size: 1.4rem !important; }
                  .hero-stats-container div div:last-of-type { font-size: 0.65rem !important; }
                  
                  .fleet-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 0.5rem !important; max-width: 100% !important; margin: 0 !important; }
                  .fleet-card { border-radius: 12px !important; }
                  .fleet-card-img { height: 110px !important; }
                  .fleet-card-info { padding: 0.5rem !important; }
                  .fleet-card-info h3 { font-size: 0.8rem !important; min-height: 2.2em !important; -webkit-line-clamp: 2 !important; overflow: hidden !important; text-overflow: ellipsis !important; line-height: 1.2 !important; margin-bottom: 4px !important; }
                  .fleet-card-info .avail-badge { font-size: 0.55rem !important; padding: 2px 6px !important; top: 8px !important; right: 8px !important; }
                  .fleet-card-info .avail-badge span { width: 5px !important; height: 5px !important; }
                  .fleet-card-info .stars-row { font-size: 0.6rem !important; margin-bottom: 4px !important; }
                  .fleet-card-info .specs-col { font-size: 0.65rem !important; gap: 2px !important; margin-bottom: 6px !important; }
                  .fleet-card-info .icons-row { font-size: 0.65rem !important; gap: 6px !important; margin-bottom: 6px !important; }
                  .fleet-card-info .price-row .price-label { font-size: 0.6rem !important; }
                  .fleet-card-info .price-row .price-val { font-size: 1rem !important; }
                  .fleet-card-info .price-row .price-unit { font-size: 0.6rem !important; }
                  .fleet-card-info .btn-row { gap: 4px !important; flex-direction: column !important; }
                  .fleet-card-info .btn-row button { padding: 0.4rem !important; font-size: 0.7rem !important; border-radius: 6px !important; height: auto !important; width: 100% !important; }
                  
                  .promo-modal-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 0.5rem !important; max-width: 100% !important; margin: 0 !important; }
                  .promo-card-img { height: 100px !important; }
                  .promo-card-info { padding: 0.5rem !important; }
                  .promo-card-info h3 { font-size: 0.75rem !important; min-height: 2.2em !important; margin-bottom: 4px !important; }
                  .promo-card-info button { padding: 0.5rem !important; font-size: 0.7rem !important; }

                  .services-grid { grid-template-columns: 1fr !important; }
                  
                  .why-us-flex { gap: 2rem !important; }
                  .why-us-flex > div:first-child { padding: 0 0.5rem !important; }
                  
                  h2 { font-size: 1.6rem !important; }
                }

                /* ─── VERY SMALL PHONES (≤420px) ─── */
                @media (max-width: 420px) {
                  .hero-content h1 { font-size: 1.8rem !important; }
                  .hero-content p { font-size: 0.82rem !important; }
                  h2 { font-size: 1.4rem !important; }
                  
                  .fleet-card-img { height: 180px !important; }
                  .fleet-card-info { padding: 0.8rem !important; }
                  .fleet-card-info h3 { font-size: 0.92rem !important; }
                  .fleet-card-info .btn-row button { font-size: 0.75rem !important; height: 38px !important; }
                  
                  .floating-wa { width: 48px !important; height: 48px !important; bottom: 1.2rem !important; right: 1rem !important; }
                }

                @media (min-width: 1200px) {
                  .fleet-grid { grid-template-columns: repeat(4, 1fr) !important; }
                  .promo-modal-grid { grid-template-columns: repeat(4, 1fr) !important; }
                }

                @keyframes pulseGreen {
                  0% { box-shadow: 0 0 0 0 rgba(19, 115, 51, 0.7); }
                  70% { box-shadow: 0 0 0 6px rgba(19, 115, 51, 0); }
                  100% { box-shadow: 0 0 0 0 rgba(19, 115, 51, 0); }
                }

                @keyframes pulseText {
                  0% { opacity: 1; transform: scale(1); }
                  50% { opacity: 0.8; transform: scale(1.02); }
                  100% { opacity: 1; transform: scale(1); }
                }

                @keyframes slideInRight {
                  from { transform: translateX(100%); opacity: 0; }
                  to { transform: translateX(0); opacity: 1; }
                }

                @keyframes shimmer {
                  0% { background-position: 100% 0; }
                  100% { background-position: -100% 0; }
                }

                .shimmer-bg {
                  animation: shimmer 3s linear infinite;
                }

                @keyframes fadeIn {
                  from { opacity: 0; }
                  to { opacity: 1; }
                }

                @keyframes pulse {
                  0% { transform: scale(1); opacity: 1; }
                  50% { transform: scale(1.1); opacity: 0.8; }
                  100% { transform: scale(1); opacity: 1; }
                }

                @keyframes bounceSmall {
                  0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
                  40% { transform: translateY(-4px); }
                  60% { transform: translateY(-2px); }
                }

                @keyframes greenGlowPulse {
                    0% { box-shadow: 0 0 10px rgba(34,197,94,0.2); border-color: rgba(34,197,94,0.4); }
                    50% { box-shadow: 0 0 25px rgba(34,197,94,0.6); border-color: rgba(34,197,94,0.8); }
                    100% { box-shadow: 0 0 10px rgba(34,197,94,0.2); border-color: rgba(34,197,94,0.4); }
                }

            `}</style>
        </div >
    );
}
