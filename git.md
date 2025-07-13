# 🌿 Git Feature Branch Workflow

This guide explains how to work on a feature branch, keep it updated with `develop`, and clean up after merging.

---

## 🚀 Start a New Feature Branch

```bash
git checkout develop
# Switch to the develop branch

git pull origin develop
# Update local develop with latest remote changes

git checkout -b feature/branch-name develop
# Create and switch to a new feature branch from develop
```

---

## 💾 Make and Commit Changes

```bash
git add .
# Stage changes

git commit -m "Your message here"
# Commit your work

git push origin feature/branch-name
# Push feature branch to remote
```

---

## 🔄 Keep Feature Branch Updated with `develop`

```bash
git add .
git commit -m "Saving work before updating from develop"
# Save current work

git checkout develop
# Switch to develop

git pull origin develop
# Get latest changes

git checkout feature/branch-name
# Switch back to feature branch

git merge develop
# Merge latest develop into feature branch

git push origin feature/branch-name
# Push updated branch to remote
```

> ⚠️ Resolve conflicts if needed and test after merge.

---

## 🧩 Merge Conflicts

```bash
# After resolving conflicts:
git add .
# Stage resolved files

git commit -m "Resolve merge conflicts with develop"
# Commit the resolution
```

---

## 🧹 Cleanup After Merge

```bash
git branch -d feature/branch-name
# Delete local feature branch

git push origin --delete feature/branch-name
# Delete remote feature branch
```

---

✅ Done! You’ve completed the full Git flow for working with a feature branch.
