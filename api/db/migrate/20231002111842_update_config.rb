class UpdateConfig < ActiveRecord::Migration[5.2]
  def change
    # remove_column :configures, :shift_start_day
    # remove_column :configures, :shift_span
    add_column :configures, :shift_start_day,:int,defaut: 1
    add_column :configures, :shift_span,:int
  end
end
