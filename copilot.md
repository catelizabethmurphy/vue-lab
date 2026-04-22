# how i used LLMs to help me with this app

I used two forms of AI: first, I used Claude in-browser to help me better understand Vue's structure by asking for more info on:
- how single-file components work
- what <script setup>, <template> and <style scoped> do
- what ref and reactivity do
- how to use v-if and v-for to control rendering
- how props work

I also used Claude in-browser to understand more about how to implement pagination, sorting and search. It taught me about how `computed` works to rerun the cache to display a new, kind of "custom" version of `filteredData` to match changes to `dataArray`, `searchQuery`, `sortField` and `sortOrder` and how `paginatedData` uses `filteredData` and `currentPage` to slice the right page from the already-filtered results. I also learned write the filter for the `searchQuery` and how to define sortable fields as an array to make the table headers the sorting buttons.

Claude did help me with this piece of the code, but I learned the pipeline: raw data -> filtered by search -> sorted -> sliced.

I also used Copilot in my GitHub Codespace, but mostly to generate patches for my sorting and pagination code and help me write helper functions to filter out rows with no neighborhood listed and clean the SRType column.