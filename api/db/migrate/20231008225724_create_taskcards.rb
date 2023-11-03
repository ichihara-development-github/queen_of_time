class CreateTaskcards < ActiveRecord::Migration[5.2]
  def change
    create_table :taskcards do |t|
      t.references :organization, null: false,forign_key: true
      t.string :title
      t.integer :order
      t.timestamps
    end
  end
end
