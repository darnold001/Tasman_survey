class CreateWells < ActiveRecord::Migration[6.0]
  def change
    create_table :wells do |t|
      t.string :well_id
      t.float :toc_elev
      t.float :grnd_elev
      t.references :survey, null: false, foreign_key: true

      t.timestamps
    end
  end
end
