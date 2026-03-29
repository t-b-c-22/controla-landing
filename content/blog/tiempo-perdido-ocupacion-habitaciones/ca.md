---
title: "Quant temps perd el teu hotel per no saber si hi ha hostes a l'habitació?"
description: "Housekeeping perd entre un 10 i un 15% del seu temps buscant a quina habitació anar. Analitzem el problema, les dades i com resoldre'l amb sensors intel·ligents."
tag: "Operativa"
date: "2026-03-29"
---

Hi ha una pregunta que sembla simple però que amaga un dels majors problemes operatius d'un hotel: **hi ha algú a l'habitació?**

No parlem de si l'habitació està reservada. Això ho diu el PMS. Parlem de si els hostes són físicament dins de l'habitació en aquest moment. Aquesta informació, que sembla trivial, és la que desencadena (o bloqueja) gairebé tota l'operativa de l'hotel.

## El problema real: ningú sap qui és on

Quan housekeeping comença el seu torn, rep una llista d'habitacions per netejar. Però aquesta llista no diu si l'hoste ja se n'ha anat, si encara dorm, o si ha sortit a esmorzar i tornarà en 20 minuts.

El que passa llavors és previsible:

- La cambrera puja al pis, truca a la porta. No contesta ningú. Entro? Espero?
- Truca a recepció. Recepció no ho sap. Truca a l'hoste. No contesta.
- Se salta l'habitació, va a la següent. Després ha de tornar.
- El supervisor passa **47 minuts per torn** només fent trucades de coordinació sobre l'estat de les habitacions, segons [Switch Hotel Solutions](https://switchhotelsolutions.com.au/housekeeping-efficiency-metrics-guide/).

Aquest cicle es repeteix desenes de vegades al dia. I no és un problema menor.

![Housekeeping sense informació: habitació desordenada i cambrera esperant al passadís](/blog/housekeeping-sin-info.png)

## Les dades: entre un 10 i un 15% del temps de housekeeping es perd

Segons dades de [Mews](https://www.mews.com/en/products/housekeeping-software) i la nostra pròpia experiència amb més de 50 projectes implementats, **l'equip de housekeeping perd entre un 10 i un 15% del seu temps** simplement intentant esbrinar a quina habitació pot entrar.

No és temps dedicat a netejar. No és temps productiu. És temps mort: caminant pels passadissos, trucant a les portes, fent trucades, esperant respostes.

Per a un hotel de 100 habitacions amb un equip de 8 persones a housekeeping, això pot representar **més d'1 hora diària de treball perdut per persona**. Multiplicat per un any, estem parlant de centenars d'hores i milers d'euros en salaris que no produeixen resultat.

## El cost ocult va més enllà del temps

El problema no acaba a housekeeping. La manca d'informació sobre l'ocupació real genera un efecte dominó:

**1. Recepció no pot oferir early check-in.** Si no saps quines habitacions estan realment buides (no només les que tenen checkout a les 11), no pots oferir a l'hoste que està esperant al vestíbul entrar abans. Cada early check-in que no ofereixes és un punt menys en satisfacció.

**2. Els turnover s'allarguen innecessàriament.** Segons [Prostay](https://www.prostay.com/blog/housekeeping-technology/), en molts mercats el temps entre checkout i check-in s'ha reduït un 30%. Amb menys marge, cada minut que housekeeping perd buscant habitacions buides té un impacte directe en l'operativa.

**3. La comunicació entre equips col·lapsa.** Recepció truca a housekeeping. Housekeeping truca al supervisor. El supervisor truca a recepció. Plataformes de comunicació simples poden reduir les trucades telefòniques a housekeeping un 90% i estalviar als supervisors més de 45 minuts diaris, segons [Breakroom](https://www.breakroomapp.com/blog/itll-just-be-a-few-more-hours-welcome-to-your-least-favorite-hotel).

**4. No hi ha dades per optimitzar.** Sense saber quan realment se'n van els hostes, no pots analitzar patrons, predir demanda de neteja ni assignar recursos de forma intel·ligent.

## La solució: saber en temps real si l'habitació està ocupada

La tecnologia per resoldre això ja existeix i és sorprenentment simple: **sensors de presència** instal·lats a cada habitació que informen en temps real si hi ha algú dins o no.

No parlem de càmeres. No parlem de demanar a l'hoste que faci res. Parlem de sensors discrets que detecten presència humana i envien aquesta informació a un dashboard central i, si es vol, directament al mòbil de l'equip de housekeeping.

![Dashboard d'ocupació de Controlá mostrant l'estat de cada habitació en temps real](/blog/dashboard-ocupacion.svg)

### Què canvia quan tens aquesta informació:

- **Housekeeping sap exactament a quina habitació anar.** No més trucar portes, no més trucades, no més voltes innecessàries pels passadissos.
- **Recepció pot oferir early check-in amb confiança.** Si el sensor diu que l'habitació 305 porta buida des de les 8:30 i housekeeping ja l'ha netejat, pots oferir-la a les 12:00 sense dubtes.
- **El supervisor gestiona des del dashboard.** Veu d'un cop d'ull quines habitacions estan buides, quines ocupades, i quines ja estan llestes. S'han acabat les 47 trucades per torn.
- **Tens dades reals per optimitzar.** Saps que els dilluns el 60% dels hostes se'n van abans de les 9:00. Pots ajustar els torns de neteja en conseqüència.

## Cas real: Lodging Apartments, Barcelona

[Lodging Apartments](https://lodgingapartments.com/) és una de les empreses de gestió d'apartaments turístics més grans de Barcelona. Gestionen desenes de propietats a la ciutat.

Abans d'implementar sensors d'ocupació, el seu equip d'operacions depenia de trucades i missatges per coordinar les neteges. El resultat: retards, habitacions llestes tard, i un equip frustrat.

Després d'instal·lar el nostre sistema de presència en temps real, **l'equip d'operacions estalvia aproximadament 30 minuts al dia** només en coordinació. Les cambreres van directes a les habitacions buides, recepció ofereix early check-in quan hi ha disponibilitat real, i els supervisors gestionen tot des del dashboard sense necessitat de fer trucades.

Amb més de **3.000 checkouts processats** a través del nostre sistema, les dades confirmen que el checkout promig real passa molt abans de l'hora oficial de les 11:00. Això significa que hi ha hores de marge que els hotels estan desaprofitant per no tenir visibilitat.

## La tecnologia darrere: com ho fem a Controlá

El nostre sistema combina sensors de presència amb algorismes intel·ligents per determinar amb un **99,7% de certesa** si una habitació està ocupada o buida.

El sistema s'integra amb el PMS de l'hotel i envia notificacions en temps real als equips. Quan un hoste se'n va, housekeeping rep una alerta instantània. No ha d'esperar que recepció se n'assabenti, ni que l'hoste avisi, ni que algú truqui a la porta.

A més, tota la informació queda registrada: horaris reals de checkout, temps d'ocupació per habitació, patrons per dia de la setmana. Dades que permeten prendre decisions informades sobre dotació de personal, torns i priorització de neteja.

## Conclusió: la dada més simple és la més valuosa

No necessites intel·ligència artificial avançada ni una transformació digital completa per millorar dràsticament l'operativa del teu hotel. De vegades, la resposta a una pregunta simple — **hi ha algú a l'habitació?** — és el que marca la diferència entre un equip que perd hores donant voltes i un que treballa amb precisió.

Els hotels que ja han adoptat aquesta tecnologia reporten [millores d'eficiència del 20-30%](https://www.prostay.com/blog/housekeeping-technology/) en les seves operacions de housekeeping. I el retorn d'inversió es mesura en setmanes, no en anys.

---

*A Controlá implementem sensors d'ocupació en temps real per a hotels i apartaments turístics. Si vols veure com funcionaria en el teu cas, [explica'ns sobre el teu hotel](#contacto) i et mostrarem l'impacte en la teva operativa.*
