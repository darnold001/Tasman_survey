class CreateWells < ActiveRecord::Migration[6.0]
  def change
    create_table :wells do |t|
      t.string :wellID
      t.date :date
      t.float :rodheight
      t.float :corrected
      t.string :camlock
      t.float :depthtowater
      t.float :gwe
      t.float :gse
      t.string :notes
      t.references :survey, null: false, foreign_key: true

      t.timestamps
    end
  end
end
