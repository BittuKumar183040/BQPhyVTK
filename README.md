
# Result Rendering

This is a repository which is mojorly resposible for render the **result file of extension** *.vtk which is of type _unstructured data_.

## Technologies Used

- [React](https://beta.reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Regular Expression](https://regexr.com/)
- [GLSL](https://developer.mozilla.org/en-US/docs/web/api/webgl_api/tutorial/getting_started_with_webgl)
- [React Three Fiber](https://docs.pmnd.rs/react-three-fiber/getting-started/introduction)

## Coding Standards (Front-End)

- Use functional components; avoid class-based components.
- Keep components small, reusable, and loosely coupled.
- Separate logic and UI components into different folders.

  ```jsx, js
  - src
    |-- components
    |   |-- Graph.js        [Side colormap which shows color, max and min displacemnt and value lie between them]
    |   |-- FileUpload.js
    |   |-- Heatmap.js
    |   |-- Inner.js        [Responsible for rendering and compering displacemnts]
    |   |-- Loading.jsx
    |-- App.js
    |-- VtkRendering.jsx    [This file contains Canvas and most of the rendering Functions]
  ```

  - **components:** Reusable components.
  
- Report UX bugs promptly.
- Define routing and state management standards during project development.
- Test app performance using tools like Lighthouse.

## Repository Maintenance Guidelines

### 🚫 Never work on the master branch 🙏🙏.

- Avoid blind `git add .`; use `.gitignore` for irrelevant files.
- Create a git repository using `git init` or clone from GitHub with `git clone url`.
- Work on your branch using `git checkout -b branch_name`.
- Use meaningful commit messages and the provided template.
- Naming convention for branches: `<type>/<issue#>-<issue_description>`

### Naming convention example

```jsx
<feat|bugfix|style/refactor> / <issue #> - <issue_description>
```

- `feat`: New feature
- `refactor`: Code refactor
- `style`: Styling changes
- `bugfix`: Bug fix
- `issue`: Linked to changes
- `issue_description`: Brief change description

### Commit Message Template

```jsx
feat: Summarize changes in around 50 characters or less

Detailed explanatory text, if necessary (wrap at 72 characters). Explain the problem, focusing on why, not how.

- Bullet points are okay.

Resolves: #123 (component ID or reference ID)
See also: #456, #789
```

### Commit Types

- `feat`: New feature
- `fix`: Bug fix
- `style`: Styling changes
- `refactor`: Code refactor
- `test`: Testing-related changes
- `docs`: Documentation changes
- `chore`: Regular code maintenance

### Gitmoji

- ➕: Adding a file or implementing a feature
- 🔨: Fixing a bug or issue
- 💚: Improving code or comments
- ⚡: Improving performance
- 📜: Updating docs or readme
- 🔑: Dealing with security
- 🔁: Updating dependencies or data
- ✅: A new release was built
- 👕: Refactoring or removing linter warnings
- ❌: Removing code or files

### Docker Instructions
- Build the image 
  <code>docker build -t vtkrenderer .</code><br>
- Run the image
  <code>docker run -d -p 3000:3000 vtkrenderer</code>
