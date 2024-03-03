import clsx from 'clsx'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useOutletContext } from 'react-router-dom'

import { useGetCategoriesListQuery } from '@/api/categories'
import { useGetCategoryImageQuery } from '@/api/categories'

import { ReactComponent as CategorySymbolIcon } from '@/assets/svg/category-symbol.svg'

function Category(props) {
  const { category } = props

  const { t } = useTranslation()

  const { data: imgUrl } = useGetCategoryImageQuery(category.id)

  return (
    <div className="flex max-w-5xl w-full h-16 bg-white rounded-2xl shadow-card md:h-48">
      <figure
        className="aspect-[85/64] min-w-[85px] overflow-hidden flex items-center justify-center rounded-2xl md:aspect-[3/2] md:h-full lg:aspect-[2/1]"
        style={{ background: category.categoryColor }}
      >
        {imgUrl && <img src={imgUrl} alt="" className="!max-w-full w-full h-full object-contain" />}
      </figure>
      <div className="min-w-0 flex-1 flex flex-col space-y-1 px-4 py-2 md:space-y-2 md:px-12 md:py-6">
        <h2
          className="font-bold text-lg leading-5 uppercase text-ellipsis overflow-hidden whitespace-nowrap md:text-[36px] md:leading-[48px]"
          style={{ color: category.categoryColor }}
        >
          {category.name}
        </h2>
        <div className="">
          <Link
            className="ds-btn min-h-fit h-6 border-0 px-2 rounded-[42px] shadow-button text-base leading-5 text-white normal-case md:h-10 md:px-4 md:text-2xl lg:h-[70px] lg:text-4xl lg:px-4"
            style={{ background: category.categoryColor }}
            to={`/categories/${category.id}/participants`}
          >
            {t('button.goToVote.label')}
          </Link>
        </div>
      </div>
    </div>
  )
}

export default function CategoriesPage() {
  const { t } = useTranslation()
  const [, setTopBar] = useOutletContext()

  const { data } = useGetCategoriesListQuery()

  const { results: categoriesList = [] } = data ?? {}

  useEffect(() => {
    setTopBar(
      <div className="relative flex justify-center">
        <button
          className={clsx(
            'relative -top-5 z-above-appBar flex items-center justify-center bg-[#DB001A] border border-[#DB001A] shadow-button px-3 py-2 font-bold text-xl text-white uppercase',
            'lg:-top-7 lg:px-6 lg:py-3 lg:text-[50px] lg:leading-[60px]'
          )}
        >
          <CategorySymbolIcon className="w-5 h-auto lg:w-12" />
          {t('categories', { context: 'withSymbol' })}
        </button>
      </div>
    )
  }, [setTopBar])

  return (
    <div className="container mx-auto px-6 pb-6 md:pb-10">
      {/* <div className="flex items-center justify-center space-x-3 mt-3 mb-10 px-9">
        <div>
          <div className="flex items-center justify-center w-8 h-8 bg-[#899C3A] shadow-card rounded-full font-bold text-xl text-white">i</div>
        </div>
        <p className="font-bold text-sm text-[#656565] md:text-2xl">{t('It is possible to express up to 3 preferences for each category.')}</p>
      </div> */}
      <div className="flex flex-col items-center space-y-3 md:space-y-8">
        {categoriesList.map((category) => (
          <Category key={category.id} category={category} />
        ))}
      </div>
    </div>
  )
}
