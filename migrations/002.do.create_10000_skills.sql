CREATE TABLE skills (
    id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    title TEXT NOT NULL,
    time_left BIGINT NOT NULL,
    date_created TIMESTAMPTZ DEFAULT now() NOT NULL,
    date_modified TIMESTAMPTZ
);

ALTER TABLE skills
    ADD COLUMN
        owner_id INTEGER REFERENCES users(id) ON DELETE CASCADE NOT NULL;