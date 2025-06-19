import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { FAQSearch } from '@/components/faq/faq-search'

// Mock next-intl
jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
}))

describe('FAQSearch Component', () => {
  const mockProps = {
    searchQuery: '',
    onSearchChange: jest.fn(),
    selectedCategory: 'all',
    onCategoryChange: jest.fn(),
    selectedTags: [],
    onTagsChange: jest.fn(),
    availableTags: ['duration', 'schedule', 'payment', 'career'],
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders search input correctly', () => {
    render(<FAQSearch {...mockProps} />)
    
    const searchInput = screen.getByPlaceholderText('searchPlaceholder')
    expect(searchInput).toBeInTheDocument()
    expect(searchInput).toHaveValue('')
  })

  it('calls onSearchChange when typing in search input', async () => {
    const user = userEvent.setup()
    render(<FAQSearch {...mockProps} />)
    
    const searchInput = screen.getByPlaceholderText('searchPlaceholder')
    await user.type(searchInput, 'test query')
    
    expect(mockProps.onSearchChange).toHaveBeenCalledWith('test query')
  })

  it('shows filter panel when filter button is clicked', async () => {
    const user = userEvent.setup()
    render(<FAQSearch {...mockProps} />)
    
    const filterButton = screen.getByRole('button')
    await user.click(filterButton)
    
    expect(screen.getByText('categories.title')).toBeInTheDocument()
  })

  it('displays category filters correctly', async () => {
    const user = userEvent.setup()
    render(<FAQSearch {...mockProps} />)
    
    const filterButton = screen.getByRole('button')
    await user.click(filterButton)
    
    expect(screen.getByText('categories.all')).toBeInTheDocument()
    expect(screen.getByText('categories.general')).toBeInTheDocument()
    expect(screen.getByText('categories.programs')).toBeInTheDocument()
  })

  it('calls onCategoryChange when category is selected', async () => {
    const user = userEvent.setup()
    render(<FAQSearch {...mockProps} />)
    
    const filterButton = screen.getByRole('button')
    await user.click(filterButton)
    
    const programsCategory = screen.getByText('categories.programs')
    await user.click(programsCategory)
    
    expect(mockProps.onCategoryChange).toHaveBeenCalledWith('programs')
  })

  it('displays available tags correctly', async () => {
    const user = userEvent.setup()
    render(<FAQSearch {...mockProps} />)
    
    const filterButton = screen.getByRole('button')
    await user.click(filterButton)
    
    expect(screen.getByText('duration')).toBeInTheDocument()
    expect(screen.getByText('schedule')).toBeInTheDocument()
    expect(screen.getByText('payment')).toBeInTheDocument()
    expect(screen.getByText('career')).toBeInTheDocument()
  })

  it('calls onTagsChange when tag is clicked', async () => {
    const user = userEvent.setup()
    render(<FAQSearch {...mockProps} />)
    
    const filterButton = screen.getByRole('button')
    await user.click(filterButton)
    
    const durationTag = screen.getByText('duration')
    await user.click(durationTag)
    
    expect(mockProps.onTagsChange).toHaveBeenCalledWith(['duration'])
  })

  it('shows active filters when filters are applied', () => {
    const propsWithFilters = {
      ...mockProps,
      searchQuery: 'test',
      selectedCategory: 'programs',
      selectedTags: ['duration'],
    }
    
    render(<FAQSearch {...propsWithFilters} />)
    
    expect(screen.getByText('activeFilters')).toBeInTheDocument()
    expect(screen.getByText('search: "test"')).toBeInTheDocument()
    expect(screen.getByText('categories.programs')).toBeInTheDocument()
    expect(screen.getByText('duration')).toBeInTheDocument()
  })

  it('clears search filter when X is clicked', async () => {
    const user = userEvent.setup()
    const propsWithSearch = {
      ...mockProps,
      searchQuery: 'test',
    }
    
    render(<FAQSearch {...propsWithSearch} />)
    
    const clearSearchButton = screen.getByRole('button', { name: /clear search/i })
    await user.click(clearSearchButton)
    
    expect(mockProps.onSearchChange).toHaveBeenCalledWith('')
  })

  it('clears all filters when clear all button is clicked', async () => {
    const user = userEvent.setup()
    const propsWithFilters = {
      ...mockProps,
      searchQuery: 'test',
      selectedCategory: 'programs',
      selectedTags: ['duration'],
    }
    
    render(<FAQSearch {...propsWithFilters} />)
    
    const filterButton = screen.getByRole('button')
    await user.click(filterButton)
    
    const clearAllButton = screen.getByText('clearFilters')
    await user.click(clearAllButton)
    
    expect(mockProps.onSearchChange).toHaveBeenCalledWith('')
    expect(mockProps.onCategoryChange).toHaveBeenCalledWith('all')
    expect(mockProps.onTagsChange).toHaveBeenCalledWith([])
  })

  it('removes tag from selection when tag is clicked again', async () => {
    const user = userEvent.setup()
    const propsWithTags = {
      ...mockProps,
      selectedTags: ['duration', 'schedule'],
    }
    
    render(<FAQSearch {...propsWithTags} />)
    
    const filterButton = screen.getByRole('button')
    await user.click(filterButton)
    
    const durationTag = screen.getByText('duration')
    await user.click(durationTag)
    
    expect(mockProps.onTagsChange).toHaveBeenCalledWith(['schedule'])
  })

  it('handles empty available tags gracefully', async () => {
    const user = userEvent.setup()
    const propsWithoutTags = {
      ...mockProps,
      availableTags: [],
    }
    
    render(<FAQSearch {...propsWithoutTags} />)
    
    const filterButton = screen.getByRole('button')
    await user.click(filterButton)
    
    expect(screen.getByText('categories.title')).toBeInTheDocument()
    expect(screen.queryByText('tags.title')).not.toBeInTheDocument()
  })
}) 