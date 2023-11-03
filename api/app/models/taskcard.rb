class Taskcard < ApplicationRecord
    has_many :tasks, dependent: :destroy
end
