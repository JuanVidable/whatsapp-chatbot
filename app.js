const { createBot, createProvider, createFlow, addKeyword } = require('@bot-whatsapp/bot')

const QRPortalWeb = require('@bot-whatsapp/portal')
const BaileysProvider = require('@bot-whatsapp/provider/baileys')
const MockAdapter = require('@bot-whatsapp/database/mock')

const flowSecundario = addKeyword(['2', 'siguiente']).addAnswer(['📄 Aquí tenemos el flujo secundario'])

const flowAsesorLlamada = addKeyword(['1']).addAnswer(
    [
        '¡Genial! Un asesor se estara contactando por _*Llamada telefónica*_',
        'Gracias y saludos.'
    ]
)

const flowAsesorWpp = addKeyword(['2']).addAnswer(
    [
        '¡Genial! Un asesor se estara contactando por _*WhatsApp*_',
        '',
        'Gracias por contactarte con Pi Real Estate.'
    ]
)

const flowAsesor = addKeyword(['asesor']).addAnswer(
    [
        '¿Como prefiere que lo contactemos? (Escriba un número)',
        ' ',
        '*1*) Llamada telefónica',
        '*2*) WhatsApp',
    ],
    null,
    null,
    [flowAsesorLlamada, flowAsesorWpp]
    
)

const flowAnfitrion = addKeyword(['anfitrion', 'anfitrión', 'anf', 'anfitron', '1']).addAnswer(
    [
        'El _*Edificio Anfitrión*_ es un proyecto inmobiliario *único* y *exclusivo* para alquiler temporario, ubicado en Mendoza - Argentina, Capital Internacional del Vino 🍷. Se encuentra en el corazón de la Quinta Sección, a metros del Parque Gral San Martín.',
    ],
)
    .addAnswer(
        '*Anfitrión* es un edificio cuyos departamentos podrán ser alquilados bajo la modalidad de *alquiler temporario* (ideal a través de Airbnb), lo que asegura una *rentabilidad en dólares*; por ejemplo, cada departamento puede ser dividido en 2 unidades independientes sin necesidad de ningún tipo de construcción adicional, lo que le brinda al inversor la posibilidad de maximizar la rentabilidad del alquiler 💰. La rentabilidad estimada por alquiler temporario es del *14,9%* - contra un *4,1%* que ofrece un alquiler tradicional -  y la rentabilidad patrimonial estimada es del *49%*.',
    )
    .addAnswer(
        'Además *Anfitrión* contará con una innovadora cañería de vino en cada departamento, lo que lo convierte en el primer edificio en el mundo con este sistema. Contará también con un *viñedo en terraza*, *cavas de vino subterráneas*, *SUM* y *exclusivo rooftop*, y *galería de objetos*.',
    )
    .addAnswer(
    [
        'A continuación, te envío un archivo con información de la empresa y otro archivo con información de relevancia del proyecto. Quedo a total disposición por cualquier inquietud o consulta que tengas.',
        '',
        '-Link de nuestro *video institucional*: https://pireal.com.ar/anfitrionlp/wp-content/uploads/2024/02/Video-Institucional-Pi-Real-Estate_H.mp4',
        '',
        '-Link del *Brochure*: https://pireal.com.ar/anfitrionlp/wp-content/uploads/2024/02/Anfitrion-Brochure-corto-2024.pdf',

        '',
        'Si tiene dudas puede hablar directamente con un asesor de ventas escribiendo la palabra *asesor*.'
    ],
    
    null,
    null,
    [flowAsesor]
)

const flowAndro = addKeyword(['andro']).addAnswer(
    [
        "asfas andro",    
    ],
)
    .addAnswer(
    [

    ],
    
    null,
    null,
    [flowSecundario]

)





const flowPrincipal = addKeyword(['anfitrión'])
    .addAnswer('¡Hola! Me presento: mi nombre es Pilar, trabajo en el área comercial de _*Pi Real Estate*_. ¿Podrias indicarme tu nombre por favor?',
    {capture: true},
    async (ctx, {flowDynamic, state}) => {
        await state.update({name: ctx.body})
    
        await flowDynamic(`¡Gracias por tu nombre ${ctx.body}!`)
    }
    )
    .addAnswer(
        [
            'Contamos con una variedad de proyectos disruptivos y únicos tanto en _Mendoza, Argentina_ como en _Barcelona, España_.',
            '',
            'Seleccioná el proyecto por el cual estás interesado:',
            '',
            '*1) Anfitrión* - Edificio del vino 🍷',
            '*2) Andro* - Edificio para solteros 🕺',
            '*3) Distintxs* - Edificio LGBT+ 🏳️‍🌈',
            '*4) Otros proyectos*',            
            
            
        ],
        null,
        null,
        [flowAnfitrion, flowAndro]
    )

const flowPrincipal2 = addKeyword('info')
    .addAnswer(
        [
            'Contamos con una variedad de proyectos disruptivos y únicos tanto en _Mendoza, Argentina_ como en _Barcelona, España_.',
            '',
            'Seleccioná el proyecto por el cual estás interesado:',
            '',
            '*1) Anfitrión* - Edificio del vino 🍷',
            '*2) Andro* - Edificio para solteros 🕺',
            '*3) Distintxs* - Edificio LGBT+ 🏳️‍🌈',
            '*4) Otros proyectos*',            
            
            
        ],
        null,
        null,
        [flowAnfitrion, flowAndro]
    )


const main = async () => {
    const adapterDB = new MockAdapter()
    const adapterFlow = createFlow([flowPrincipal, flowPrincipal2])
    const adapterProvider = createProvider(BaileysProvider)

    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    })

    QRPortalWeb()
}

main()
