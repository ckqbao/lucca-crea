import clsx from 'clsx'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useOutletContext } from 'react-router-dom'

import { ReactComponent as ArrowLeftIcon } from '@/assets/svg/arrow-left-solid.svg'

export default function ProjectPage() {
  
  const { t } = useTranslation()
  const [, setTopBar] = useOutletContext()

  useEffect(() => {
    setTopBar(
      <div className="relative flex justify-center bg-[#184833]">
        <button
          className={clsx(
            'relative -top-5 z-above-appBar flex items-center justify-center bg-[#DB001A] border border-[#DB001A] shadow-button px-3 py-2 font-bold text-xl text-white uppercase',
            'lg:-top-7 lg:px-6 lg:py-3 lg:text-[50px] lg:leading-[60px]'
          )}
        >
          {t('Il progetto')}
        </button>
      </div>
    )
  }, [setTopBar])
  
  return (
    <div className="relative h-full w-full bg-[#184833] flex flex-col space-y-4 p-4 sm:p-6 md:p-8 lg:p-24">
      <p className="flex flex-wrap">
        <Link
          className={clsx(
            'inline-flex items-center justify-center w-6 h-6 bg-white shadow-button rounded-full',
            'md:w-10 md:h-10',
            'lg:w-[92px] lg:h-[92px]'
          )}
          to="/categories"
        >
          <ArrowLeftIcon className="w-4 h-4 fill-[#DB001A] md:w-6 md:h-6 lg:w-12 lg:h-12" />
        </Link>
        <span className={clsx('inline-flex items-center text-l text-white lg:text-4xl font-bold uppercase align-baseline mx-2')}>
          Home
        </span>
      </p>
      <h1 className="font-extrabold text-2xl sm:text-3xl md:text-4xl lg:text-6xl text-white">Lucca Comics & Games Community Awards</h1>
      <p className="font-normal text-sm text-white lg:text-xl">
        I “Lucca Comics & Games Community Awards” sono il riconoscimento del pubblico alle opere attinenti al mondo di Lucca Comics & Games. Opere che hanno raccontato mondi fantastici in cui immergersi, dominato le classifiche e, soprattutto, scaldato i cuori dei vari fandom. Opere che hanno generato trend di forte appeal e si sono trasformate in un fenomeno popolare. Una “People's Choice” di Lucca Comics & Games in cui la vera protagonista è la community del festival che sarà chiamata a votare le proprie opere preferite nelle seguenti categorie: Comics, Manga, Game, Videogame, Fantasy Book, Movie, Series e ovviamente il Personaggio più amato!
      </p>
      <h2 className="font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl text-white">Missione e valori</h2>
      <p className="font-normal text-sm text-white lg:text-xl">
        La missione dei Lucca Comics & Games Community Awards è quella di coinvolgere attivamente la community della manifestazione, dandole l'opportunità di esprimere il proprio supporto e apprezzamento verso le opere che contribuiscono all'enorme ricchezza e varietà delle passioni che animano Lucca Comics & Games. I Lucca Comics & Games Community Awards non solo riconoscono l'impatto e l'importanza delle opere, ma anche il ruolo fondamentale dei vari fandom nel determinare il successo e l'influenza delle opere stesse.
        Il festival Lucca Comics & Games si impegna a garantire l'equità nel processo di selezione e assegnazione dei riconoscimenti, assicurando che ogni candidato abbia pari opportunità di essere valutato e che i voti della community siano considerati con attenzione.
      </p>
      <h2 className="font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl text-white">Categorie</h2>
      <p className="font-normal text-sm text-white lg:text-xl">
        I Lucca Comics & Games Community Awards prevedono otto categorie che rappresentano gli ambiti della pop culture legati alla manifestazione. Le opere prese in considerazione per ogni categoria devono essere state pubblicate per il mercato italiano.
      </p>
      <p className='font-normal text-sm text-white lg:text-xl'>
        <div className="flex flex-wrap -mx-2">
          <div className="w-full md:w-1/2 lg:w-1/4 p-2">
            <div className="max-w-sm rounded overflow-hidden shadow-lg flex flex-col h-full ">
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2 uppercase">Movie of the year</div>
                <p className="text-white-700 text-base ">
                  Tutti i film usciti al cinema, in tv e in piattaforma, sia live action che animazione.
                </p>
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/2 lg:w-1/4 p-2">
            <div className="max-w-sm rounded overflow-hidden shadow-lg flex flex-col h-full ">
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2 uppercase">Series of the year</div>
                <p className="text-white-700 text-base ">
                  Tutte le serie - o le nuove stagioni di serie - uscite in tv e in piattaforma, sia live action che animazione.
                </p>
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/2 lg:w-1/4 p-2">
            <div className="max-w-sm rounded overflow-hidden shadow-lg flex flex-col h-full ">
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2 uppercase">Videogame of the year</div>
                <p className="text-white-700 text-base ">
                  Videogame single player e multiplayer, usciti per console, pc e mobile.
                </p>
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/2 lg:w-1/4 p-2">
            <div className="max-w-sm rounded overflow-hidden shadow-lg flex flex-col h-full ">
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2 uppercase">Fantasy Book of the year</div>
                <p className="text-white-700 text-base ">
                  Prime o nuove edizioni, libri autoconclusivi, saghe o capitoli di una saga, usciti in cartaceo o in digitale.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap -mx-2">
          <div className="w-full md:w-1/2 lg:w-1/4 p-2">
            <div className="max-w-sm rounded overflow-hidden shadow-lg flex flex-col h-full ">
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2 uppercase">Comics of the year</div>
                <p className="text-white-700 text-base ">
                  Tutti i film usciti al cinema, in tv e in piattaforma, sia live action che animazione.
                </p>
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/2 lg:w-1/4 p-2">
            <div className="max-w-sm rounded overflow-hidden shadow-lg flex flex-col h-full ">
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2 uppercase">Manga of the year</div>
                <p className="text-white-700 text-base ">
                  Tutte le opere a fumetti che per semplificazione vengono classificate come manga, siano esse giapponesi - o più generalmente asiatiche - o europee (euromanga). Sia fumetti autoconclusivi che seriali.
                </p>
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/2 lg:w-1/4 p-2">
            <div className="max-w-sm rounded overflow-hidden shadow-lg flex flex-col h-full ">
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2 uppercase">Game of the year</div>
                <p className="text-white-700 text-base ">
                  Board game, card game, role-playing game, sia nuove edizioni che edizioni riviste.
                </p>
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/2 lg:w-1/4 p-2">
            <div className="max-w-sm rounded overflow-hidden shadow-lg flex flex-col h-full ">
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2 uppercase">Character of the year</div>
                <p className="text-white-700 text-base ">
                  Personaggi di fantasia che hanno colpito l'immaginario collettivo. La versione del personaggio scelta è determinata dal medium in cui ha impattato maggiormente nel periodo di validità.
                </p>
              </div>
            </div>
          </div>
        </div>

      </p>
      
      <p className="font-normal text-sm text-white lg:text-xl">
        Le categorie dei Lucca Comics & Games Community Awards potranno variare da un anno all'altro, a discrezione di Lucca Comics & Games, al fine di riflettere l'evoluzione e le tendenze della cultura popolare.
      </p>
      
      <h2 className="font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl text-white">Selezione</h2>
      <p className="font-normal text-sm text-white lg:text-xl">
        La selezione dei candidati per i Lucca Comics & Games Community Awards sarà stilata dallo staff di Lucca Comics & Games, che anno per anno si potrà avvalere del supporto di professionisti, esperti e figure influenti nei settori di riferimento. La responsabilità della selezione finale rimarrà comunque in capo allo staff del festival. 
      </p>

      <p className="font-normal text-sm text-white lg:text-xl">
        Per l'edizione 2023, lo staff di Lucca Comics & Games sarà rappresentato da: Emanuele Vietina, Francesca Bellotto, Alberto Rigoni, Silvia Ceccarelli e Andrea Bernardini. Tra gli autori e artisti che da anni collaborano con la manifestazione, Roberto Recchioni, Cristina Scabbia, Roberto Di Meglio, Manlio Castagna e Pierdomenico Baccalario saranno coloro che daranno il proprio supporto nella validazione delle candidature. A completare il roster dei selezionatori, i cinque content creator scelti per il ruolo di Host del Lucca Comics & Games Live Show 2023: Ckibe, Claudio Di Biagio, Kurolily, Yotobi e Cydonia.
      </p>

      <p className="font-normal text-sm text-white lg:text-xl">
        La selezione avverrà in base ai criteri di eleggibilità stabiliti per ciascuna categoria. Questi criteri potrebbero includere l'originalità, l'impatto culturale e l'attinenza con il mondo di Lucca Comics & Games. Il numero di candidati selezionati in ciascuna categoria può variare a discrezione dello staff culturale di Lucca Comics & Games.
      </p>
        
      <h2 className="font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl text-white">Periodo preso in esame</h2>
      <p className="font-normal text-sm text-white lg:text-xl">
        Per ogni categoria dei Lucca Comics & Games Community Awards saranno prese in esame le date di pubblicazione delle opere nel periodo compreso tra il mese di agosto dell'anno precedente e la metà di agosto dell'anno in corso. Il periodo preso in esame assicura che vengano considerate le opere e le attività più recenti nell'ambito della cultura pop, permettendo di rifletterne le tendenze e gli sviluppi più recenti. Lo staff culturale di Lucca Comics & Games si impegna a effettuare un'attenta valutazione delle opere nel periodo preso in esame, garantendo che siano prese in considerazione le produzioni più rilevanti e significative della cultura pop. Il periodo preso in esame può variare di anno in anno a discrezione dello staff culturale di Lucca Comics & Games.
      </p>

      <h2 className="font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl text-white">Modalità di votazione</h2>
      <p className="font-normal text-sm text-white lg:text-xl">
        La votazione per i Lucca Comics & Games Community Awards avverrà attraverso il portale online MyLCG, accessibile a chiunque si registri come membro della community di Lucca Comics & Games. Al momento della registrazione, ogni membro della community sarà tenuto a fornire le informazioni necessarie per confermare l'identità e garantire l'integrità del  processo di votazione. Una volta registrati e autenticati su MyLCG, i membri della community potranno accedere alle categorie dei Lucca Comics & Games Community Awards ed esprimere fino a tre preferenze per ogni categoria. Durante il periodo di votazione, che sarà specificato dall'organizzazione di Lucca Comics & Games, i membri della community potranno visualizzare i candidati e le relative informazioni sul portale MyLCG per prendere una decisione informata. La votazione avverrà tramite un sistema di voto elettronico sul portale MyLCG, che garantirà la sicurezza e l'imparzialità del processo di votazione, consentendo a ogni membro della community di votare in maniera congrua con il regolamento, evitando voti multipli o duplicati. Il festival Lucca Comics & Games si impegna a proteggere la privacy e la riservatezza delle informazioni personali dei membri della community durante il processo di votazione.
      </p>

      <h2 className="font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl text-white">Annuncio preferiti</h2>
      <p className="font-normal text-sm text-white lg:text-xl">
        L'annuncio dei vincitori dei Lucca Comics & Games Community Awards avverrà in una data da definire durante il festival Lucca Comics & Games in diretta sul canale Twitch ufficiale del festival Lucca Comics & Games, offrendo la possibilità a un vasto pubblico di partecipare e celebrare i preferiti delle diverse categorie.
      </p>

      <h2 className="font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl text-white">F.A.Q.</h2>
      <p className="font-normal text-sm text-white lg:text-xl">
        <span className="font-bold text-l text-white">Prenderete in considerazione tutte le opere uscite ad agosto 2023?</span>
        <br />
        Se un'opera è uscita dopo la metà di agosto di quest'anno è probabile che verrà presa in considerazione per l'anno prossimo.
      </p>
      <p className="font-normal text-sm text-white lg:text-xl">
        <span className="font-bold text-l text-white">Come mai non è presente nella categoria di riferimento una determinata opera di grandissimo successo?</span>
        <br />
        Le nomination sono state frutto di una scelta ponderata e talvolta difficile. Lo staff di Lucca Comics & Games è consapevole che alcune esclusioni eccellenti potrebbero non farvi felici.
      </p>
      <p className="font-normal text-sm text-white lg:text-xl">
        <span className="font-bold text-l text-white">Come mai non è stata esclusa una determinata categoria/settore?</span>
        <br />
        Se un settore/categoria a cui tenete non è rappresentata, fatecelo sapere, educatamente, e la prenderemo in considerazione per il 2024.
      </p>
      <p className="font-normal text-sm text-white lg:text-xl">
        <span className="font-bold text-l text-white">Si può coinvolgere una community/fandom a votare la propria opera o personaggio preferito?</span>
        <br />
        Assolutamente si, non è vietato ed è anzi caldamente raccomandato.
      </p>

    </div>
  )
}
