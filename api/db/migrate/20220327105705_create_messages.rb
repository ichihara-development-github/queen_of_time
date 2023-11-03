class CreateMessages < ActiveRecord::Migration[5.2]

  def change

    create_table :rooms do |t|
      t.timestamps
    end

    create_table :employee_rooms do |t|
      t.references :employee
      t.references :room
      t.timestamps
    end
   
    create_table :messages do |t|
      t.references :room
      t.references :employee
      t.string :content
      t.string :image_url
      t.text :mention
      t.boolean :read
      t.timestamps
      t.datetime :deleted_at
    end
  end
end
