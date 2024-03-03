import _ from 'lodash'
import clsx from 'clsx'
import dayjs from 'dayjs'
import { useEffect, useMemo, useState } from 'react'
import { Link, useOutletContext, useParams } from 'react-router-dom'
import { Trans, useTranslation } from 'react-i18next'
import { toast } from 'react-hot-toast'
import { useCookies } from 'react-cookie'

import { ReactComponent as ArrowLeftIcon } from '@/assets/svg/arrow-left-solid.svg'
import { ReactComponent as CategorySymbolIcon } from '@/assets/svg/category-symbol.svg'

import { useLoginMutation } from '@/api/auth'
import { useGetParticipantsByCategoryQuery, useLazyGetCategoriesListQuery } from '@/api/categories'
import { useGetParticipantImageQuery } from '@/api/participants'
import { useLazyGetVotesByUserQuery, useVoteMutation } from '@/api/votes'

import Container from '@/components/containers/Container'
import VoteLoginModal from '@/components/modals/VoteLoginModal'
import VoteThanksModal from '@/components/modals/VoteThanksModal'

import useInterval from '@/hooks/useInterval'

import { useAppSelector } from '@/redux/store'
import { selectCategories } from '@/redux/reducers/categoryReducer'

const targetDate = dayjs('2023-10-31')

function RemainingTime(props) {
  const [currentTime, setCurrentTime] = useState(dayjs())

  useInterval(() => {
    setCurrentTime(dayjs())
  }, 60 * 1000)

  const daysRemaining = targetDate.diff(currentTime, 'days')
  const hoursRemaining = targetDate.diff(currentTime, 'hour') % 24
  const minutesRemaining = targetDate.diff(currentTime, 'minute') % 60

  const remainingTimeFormatted = `${daysRemaining} ${daysRemaining <= 1 ? 'giorno' : 'giorni'} - ${hoursRemaining} ${
    hoursRemaining <= 1 ? 'ora' : 'ore'
  } ${minutesRemaining} ${hoursRemaining <= 1 ? 'minuto' : 'minuti'} `

  return (
    <div className="font-bold text-sm sm:text-lg text-center whitespace-nowrap" style={{ color: props.color }}>
      <Trans i18nKey="categoryRemainingTime">Remaining time: {{ remainingTimeFormatted }}</Trans>
    </div>
  )
}

function Participant(props) {
  const { categoryColor, onVote, participant, voteDisabled } = props

  const { t } = useTranslation()

  const { data: imgUrl } = useGetParticipantImageQuery(participant.id)

  return (
    <div className="flex max-w-7xl w-full bg-transparent rounded-2xl md:h-[313px] lg:bg-white lg:shadow-card">
      <figure
        className={clsx('h-32 aspect-square overflow-hidden flex items-center justify-center rounded-2xl z-[2] md:h-60 lg:h-full', { 'bg-[#B7B7B7]': !imgUrl })}
      >
        {imgUrl && <img src={imgUrl} className="max-w-full w-full h-full object-cover" />}
      </figure>
      <div className="flex flex-1 flex-col min-h-[214px] bg-white shadow-card rounded-2xl -ml-5 pl-11 pt-2 pr-6 pb-4 md:-ml-8 md:pl-16 md:pt-4 md:pr-8 md:pb-6 lg:flex-row lg:bg-transparent lg:shadow-none">
        <div className="flex flex-1 flex-col space-y-2 lg:space-y-3">
          <h2 className="font-extrabold text-xl lg:text-4xl" style={{ color: categoryColor }}>
            {participant.name}
          </h2>
          <p className="font-normal text-xs lg:text-xl text-black">
            {participant.description}
          </p>
        </div>
        <div className="flex items-end">
          <button
            className={clsx(
              'ds-btn h-auto min-h-0 px-[10px] py-[6px] rounded-[42px] font-bold text-lg leading-5 !text-white uppercase md:px-5 md:text-2xl lg:py-3 lg:text-4xl',
            )}
            disabled={voteDisabled}
            onClick={() => onVote?.(participant.id)}
            style={{ backgroundColor: categoryColor, opacity: voteDisabled ? 0.7 : 1 }}
          >
            {t('button.vote.label')}
          </button>
        </div>
      </div>
    </div>
  )
}

export default function ParticipantsPage() {
  const [, setTopBar] = useOutletContext()
  const { categoryId } = useParams()
  const { t } = useTranslation()

  const [cookies] = useCookies(['awardcookie'])

  const categories = useAppSelector(selectCategories)

  const [isVoteLoginModalOpen, setIsVoteLoginModalOpen] = useState(false)
  const [isVoteThanksModalOpen, setIsVoteThanksModalOpen] = useState(false)

  const category = useMemo(() => categories.find((category) => category.id === categoryId), [categoryId, categories])
  const userId = useMemo(() => _.split(cookies.awardcookie, '|')[1], [cookies])

  const { data: participantsList = [] } = useGetParticipantsByCategoryQuery(categoryId)
  const [getCategoriesList] = useLazyGetCategoriesListQuery()
  const [getVotesByUser, { data: votesByUser }] = useLazyGetVotesByUserQuery()
  const [login, { error: loginError, isLoading: isLogging, reset: resetLogin }] = useLoginMutation()
  const [vote] = useVoteMutation()

  useEffect(() => {
    if (!category) return

    setTopBar(
      <div
        className={clsx(
          'relative max-w-[1400px] flex flex-col items-center justify-center shadow-button mx-6 mb-4 rounded-bl-[20px] rounded-br-[20px]',
          'md:mx-8 md:mb-8',
          'lg:flex-row lg:mx-12 lg:mb-12',
          'xl:mx-14',
          '2xl:mx-auto'
        )}
        style={{ background: category.categoryColor }}
      >
        <Link
          className={clsx(
            'flex items-center justify-center w-6 h-6 bg-white shadow-button rounded-full absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2',
            'md:w-10 md:h-10',
            'lg:w-[92px] lg:h-[92px]'
          )}
          to="/categories"
        >
          <ArrowLeftIcon className="w-4 h-4 fill-[#DB001A] md:w-6 md:h-6 lg:w-12 lg:h-12" />
        </Link>
        <Link
          className={clsx(
            'absolute -top-5 z-above-appBar group flex items-center justify-center bg-[#DB001A] border border-[#DB001A] shadow-button px-3 py-2 text-xl font-bold text-white uppercase hover:bg-white hover:border-[#DA1021] hover:text-[#DA1021]',
            'lg:-top-7 lg:border-[3px] lg:px-6 lg:py-3 lg:text-[50px] lg:leading-[60px]'
          )}
          to="/categories"
        >
          <CategorySymbolIcon className="w-5 h-auto group-hover:category-symbol-hover lg:w-12" />
          {t('category', { context: 'withSymbol' })}
        </Link>
        <h1 className="w-full px-11 pt-8 font-extrabold text-lg text-center text-white uppercase lg:hidden">{category.name}</h1>
        <div className="px-8 pb-2 lg:hidden">
          <RemainingTime color={category.categoryTimeRemainingColor} />
        </div>
        <div className="hidden lg:flex-1 lg:flex lg:items-center lg:justify-center lg:space-x-3 lg:px-16 lg:pt-24 lg:pb-12">
          <h1 className="font-extrabold text-5xl text-white uppercase">{category.name}</h1>
          <p className="font-extrabold text-5xl text-white uppercase">|</p>
          <RemainingTime color={category.categoryTimeRemainingColor} />
        </div>
      </div>
    )
  }, [category, t])

  useEffect(() => {
    if (!!category) return

    getCategoriesList()
  }, [category])

  useEffect(() => {
    if (!categoryId || !userId) return

    getVotesByUser({ userId, categoryId })
  }, [categoryId, userId])

  const handleLogin = async ({ email, password }) => {
    await login({ email, password }).unwrap()
    setIsVoteLoginModalOpen(false)
  }

  const handleVote = async (participantId) => {
    if (!userId) {
      setIsVoteLoginModalOpen(true)
    } else {
      vote({ participantId, categoryId, externalUserId: userId })
        .unwrap()
        .then(() => {
          setIsVoteThanksModalOpen(true)
          getVotesByUser({ categoryId, userId })
        })
        .catch((error) => {
          if (_.get(error, 'data.code') === 500 && _.startsWith(_.get(error, 'data.message'), 'E11000')) {
            toast.error(t('You have already voted for this participant'))
          } else {
            toast.error(t('An unexpected error has occurred, please try again!'))
          }
        })
    }
  }

  if (!category) return null

  return (
    <Container className="!max-w-none !px-6 !pb-6 md:!pb-10">
      {votesByUser && (
        <div className="flex items-center justify-center space-x-3 px-9">
          <div>
            <div className="flex items-center justify-center w-8 h-8 bg-[#899C3A] shadow-card rounded-full font-bold text-xl text-white lg:w-16 lg:h-16 lg:text-4xl">
              i
            </div>
          </div>
          <p className="font-bold text-sm text-[#656565] md:text-2xl lg:text-3xl">
            <Trans i18nKey="maxVotesNumber" count={votesByUser.maxVotesNumber}>
              It is possible to express up to <span className="text-[#899C3A]">{{ count: votesByUser.maxVotesNumber }} preferences</span> for each category.
            </Trans>
          </p>
          <div>
            <div
              className="flex items-center justify-center w-8 h-8 shadow-card rounded-full font-bold text-sm text-white lg:w-16 lg:h-16 lg:text-2xl"
              style={{ backgroundColor: category.categoryColor }}
            >{`${votesByUser.votesCastedInTheCategory}/${votesByUser.maxVotesNumber}`}</div>
          </div>
        </div>
      )}
      <div className="flex flex-col items-center space-y-4 mt-8 sm:space-y-6 md:space-y-8 md:mt-11 lg:space-y-10 lg:mt-14">
        {participantsList.map((participant) => (
          <Participant
            key={participant.id}
            onVote={handleVote}
            participant={participant}
            categoryColor={category.categoryColor}
            voteDisabled={
              !votesByUser || (votesByUser.isVotingEnabled === 1 && votesByUser.votesByTheUser.every((vote) => vote.participantId !== participant.id))
                ? false
                : true
            }
          />
        ))}
      </div>
      <VoteLoginModal
        isLoading={isLogging}
        isOpen={isVoteLoginModalOpen}
        setIsOpen={setIsVoteLoginModalOpen}
        onCloseError={() => resetLogin()}
        onSubmit={handleLogin}
        submissionError={loginError ? t('error.loginFailed.message') : undefined}
      />
      <VoteThanksModal isOpen={isVoteThanksModalOpen} setIsOpen={setIsVoteThanksModalOpen} />
    </Container>
  )
}
