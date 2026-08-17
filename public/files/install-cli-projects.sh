#!/usr/bin/env bash
# Clones and builds the three CLI projects from the "CLI Renaissance" post.
# Usage: ./install-cli-projects.sh
set -euo pipefail

REPOS=(
  "cli_atm_system"
  "cli_student_database_management_system"
  "cli_task_manager_system"
)

for repo in "${REPOS[@]}"; do
  if [ ! -d "$repo" ]; then
    git clone "https://github.com/Je0Dev/${repo}.git"
  fi
  echo "Cloned ${repo}. Run make inside the folder to build it."
done

echo "Done. See each project's README for build instructions."