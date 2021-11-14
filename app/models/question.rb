# frozen_string_literal: true

class Question < ApplicationRecord
  MAX_QUESTION_LENGTH = 255
  MAX_OPTION_LENGTH = 50

  belongs_to :quiz

  validates :questn, presence: true, length: { maximum: MAX_QUESTION_LENGTH }
  validates :option1, presence: true, length: { maximum: MAX_OPTION_LENGTH }
  validates :option2, presence: true, length: { maximum: MAX_OPTION_LENGTH }
  validates :answer, presence: true
end