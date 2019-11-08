function getLevelParams(level) {
  const levelParams = [
    {
      level: 1,
      startWrapPosition: 300,
      perk: false,
      lastLevel: false,
      stage: [
        {
          translateX: -400,
          cubesAmount: 7,
          transition: 10
        },
        {
          translateX: -500,
          cubesAmount: 7,
          transition: 8
        },
        {
          translateX: 400,
          cubesAmount: 7,
          transition: 6
        },
        {
          translateX: 0,
          cubesAmount: 10,
          transition: 8
        }
      ]
    },
    {
      level: 2,
      startWrapPosition: -300,
      descriptionX: 800,
      title: 'Вторая волна',
      description:
        'Первая волна успешно отражена и было выйграно немного времени для починки основных неисправностей корабля. Щиты были перезаряжены, и их энергию можно высвободить для уничтожения вражеских кораблей (для этого нажмите space). Кажется вы слышите шум, шум надвигающийся атаки...',
      perk: true,
      lastLevel: false,
      stage: [
        {
          translateX: -100,
          cubesAmount: 10,
          transition: 8
        },
        {
          translateX: -500,
          cubesAmount: 10,
          transition: 7
        },
        {
          translateX: 300,
          cubesAmount: 10,
          transition: 6
        },
        {
          translateX: 0,
          cubesAmount: 14,
          transition: 7
        }
      ]
    },
    {
      level: 3,
      startWrapPosition: -300,
      descriptionX: 800,
      title: 'Когда осела пыль битвы... ',
      description:
        'Вы сумели продержаться до полной перезагрузки систем, к тому же взяв биологические данные атакующей вас рассы, что может быть очень ценно для Совета Галактической Безопасности. Набирая необходимую срокость для гипер-рывка вы продолжили ваше путешествие.',
      lastLevel: true
    },
  ]

  return levelParams[level]
}