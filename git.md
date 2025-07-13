# 🌿 Git Feature Branch Workflow

This guide explains how to work on a feature branch, keep it updated with `dev`, and clean up after merging.

---

## 🚀 Start a New Feature Branch

```bash
git checkout dev
# Switch to the dev branch

git pull origin dev
# Update local dev with latest remote changes

git checkout -b feature/branch-name dev
# Create and switch to a new feature branch from dev
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

## 🔄 Keep Feature Branch Updated with `dev`

```bash
git add .
git commit -m "Saving work before updating from dev"
# Save current work

git checkout dev
# Switch to dev

git pull origin dev
# Get latest changes

git checkout feature/branch-name
# Switch back to feature branch

git merge dev
# Merge latest dev into feature branch

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

git commit -m "Resolve merge conflicts with dev"
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
