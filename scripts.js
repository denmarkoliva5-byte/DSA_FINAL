
const CODE_PY = {
  array: `# array.py
class SimpleArray:
    def __init__(self):
        self.arr = []
    def insert(self, val, idx=None):
        if idx is None:
            self.arr.append(val)
        else:
            self.arr.insert(idx, val)
    def delete(self, idx):
        if 0 <= idx < len(self.arr):
            self.arr.pop(idx)
    def display(self):
        print(self.arr)

if __name__=='__main__':
    a = SimpleArray(); a.insert(1); a.insert(2); a.display()`,

  stack: `# stack_conversions.py
prec = {'+':1,'-':1,'*':2,'/':2,'^':3}
def infix_to_postfix(expr):
    stack = []; out = []
    for c in expr:
        if c.isalnum(): out.append(c)
        elif c=='(': stack.append(c)
        elif c==')':
            while stack and stack[-1] != '(':
                out.append(stack.pop())
            stack.pop()
        else:
            while stack and stack[-1] != '(' and prec.get(stack[-1],0) >= prec.get(c,0):
                out.append(stack.pop())
            stack.append(c)
    while stack: out.append(stack.pop())
    return ''.join(out)

def infix_to_prefix(expr):
    rev = []
    for c in expr[::-1]:
        if c == '(':
            rev.append(')')
        elif c == ')':
            rev.append('(')
        else:
            rev.append(c)
    return infix_to_postfix(''.join(rev))[::-1]

def eval_postfix(expr):
    st = []
    for c in expr:
        if c.isdigit(): st.append(int(c))
        else:
            b = st.pop(); a = st.pop()
            if c=='+': st.append(a+b)
            elif c=='-': st.append(a-b)
            elif c=='*': st.append(a*b)
            elif c=='/': st.append(a//b)
    return st.pop()`,

  queue: `# queue.py
from collections import deque
class SimpleQueue:
    def __init__(self): self.q = deque()
    def enqueue(self, x): self.q.append(x)
    def dequeue(self): return self.q.popleft() if self.q else None
    def display(self): print(list(self.q))

if __name__=='__main__':
    q = SimpleQueue(); q.enqueue(1); q.enqueue(2); q.dequeue(); q.display()`,

  tree: `# tree_traversals.py
class Node:
    def __init__(self, val, left=None, right=None):
        self.val=val; self.left=left; self.right=right

def inorder(n):
    return inorder(n.left)+[n.val]+inorder(n.right) if n else []
def preorder(n):
    return [n.val]+preorder(n.left)+preorder(n.right) if n else []
def postorder(n):
    return postorder(n.left)+postorder(n.right)+[n.val] if n else []

if __name__=='__main__':
    root = Node(1, Node(2, Node(4), Node(5)), Node(3))
    print('inorder', inorder(root))
    print('preorder', preorder(root))
    print('postorder', postorder(root))`
}

const CODE_CPP = {
  array: `// array.cpp
#include <bits/stdc++.h>
using namespace std;
struct SimpleArray { vector<int> a;
  void insert(int v,int idx=-1){ if(idx<0) a.push_back(v); else a.insert(a.begin()+idx,v); }
  void delete_at(int idx){ if(idx>=0 && idx<(int)a.size()) a.erase(a.begin()+idx); }
  void display(){ for(int x:a) cout<<x<<' '; cout<<\"\\n\"; }
};
int main(){ SimpleArray s; s.insert(1); s.insert(2); s.display(); return 0; }`,

  stack: `// stack_conversions.cpp
#include <bits/stdc++.h>
using namespace std;
int prec(char c){ if(c=='+'||c=='-') return 1; if(c=='*'||c=='/') return 2; if(c=='^') return 3; return 0; }
string infixToPostfix(const string &s){
  string out; stack<char> st;
  for(char c: s){
    if(isalnum(c)) out+=c;
    else if(c=='(') st.push(c);
    else if(c==')'){ while(!st.empty() && st.top()!='('){ out+=st.top(); st.pop(); } if(!st.empty()) st.pop(); }
    else { while(!st.empty() && st.top()!='(' && prec(st.top())>=prec(c)){ out+=st.top(); st.pop(); } st.push(c); }
  }
  while(!st.empty()){ out+=st.top(); st.pop(); }
  return out;
}
string infixToPrefix(const string &s){
  string rev(s.rbegin(), s.rend());
  for(char &c: rev){ if(c=='(') c=')'; else if(c==')') c='('; }
  string post = infixToPostfix(rev); reverse(post.begin(), post.end()); return post;
}
int evalPostfix(const string &s){
  stack<int> st; for(char c: s){ if(isdigit(c)) st.push(c-'0'); else { int b=st.top(); st.pop(); int a=st.top(); st.pop(); if(c=='+') st.push(a+b); if(c=='-') st.push(a-b); if(c=='*') st.push(a*b); if(c=='/') st.push(a/b); } } return st.top();
}
int main(){ cout<<\"postfix: \"<<infixToPostfix(\"a+b*(c-d)\")<<\"\\n\"; cout<<\"prefix: \"<<infixToPrefix(\"a+b*(c-d)\")<<\"\\n\"; cout<<\"eval: \"<<evalPostfix(\"23*54*+9-\")<<\"\\n\"; return 0; }`,

  queue: `// queue.cpp
#include <bits/stdc++.h>
using namespace std;
struct SimpleQueue { deque<int> q; void enqueue(int x){ q.push_back(x);} int dequeue(){ if(q.empty()) return INT_MIN; int v=q.front(); q.pop_front(); return v;} void display(){ for(int x:q) cout<<x<<' '; cout<<\"\\n\";} };
int main(){ SimpleQueue q; q.enqueue(1); q.enqueue(2); q.dequeue(); q.display(); return 0; }`,

  tree: `// tree_traversals.cpp
#include <bits/stdc++.h>
using namespace std;
struct Node{ int val; Node* left; Node* right; Node(int v):val(v),left(nullptr),right(nullptr){} };
vector<int> inorder(Node* n){ if(!n) return {}; auto L=inorder(n->left); L.push_back(n->val); auto R=inorder(n->right); L.insert(L.end(), R.begin(), R.end()); return L; }
vector<int> preorder(Node* n){ if(!n) return {}; vector<int> out={n->val}; auto L=preorder(n->left); out.insert(out.end(), L.begin(), L.end()); auto R=preorder(n->right); out.insert(out.end(), R.begin(), R.end()); return out; }
vector<int> postorder(Node* n){ if(!n) return {}; auto L=postorder(n->left); auto R=postorder(n->right); L.insert(L.end(), R.begin(), R.end()); L.push_back(n->val); return L; }
int main(){ Node* root = new Node(1); root->left=new Node(2); root->right=new Node(3); root->left->left=new Node(4); root->left->right=new Node(5);
 auto A=inorder(root); cout<<\"inorder: \"; for(int x:A) cout<<x<<' '; cout<<\"\\n\"; auto B=preorder(root); cout<<\"preorder: \"; for(int x:B) cout<<x<<' '; cout<<\"\\n\"; auto C=postorder(root); cout<<\"postorder: \"; for(int x:C) cout<<x<<' '; cout<<\"\\n\"; return 0; }`
}

// ---------- DOM helpers ----------
const el = id => document.getElementById(id)
const codeArray = el('code-array'), codeStack = el('code-stack'), codeQueue = el('code-queue'), codeTree = el('code-tree')
const langSel = el('lang'), copyCodeBtn = el('copyCodeBtn'), copyPseudoBtn = el('copyPseudoBtn')
const exportPseudoBtn = el('exportPseudoBtn'), exportBtn = el('exportBtn'), importFile = el('importFile')
const crudForm = el('crudForm'), nameInput = el('nameInput'), courseInput = el('courseInput'), editId = el('editId')
const crudTableBody = document.querySelector('#crudTable tbody')
const downloadAllBtn = el('downloadAllBtn'), menuBtn = el('menuBtn'), nav = el('mainNav')

// ---------- render code blocks ----------
function renderCode(){
  const lang = langSel.value
  const src = (lang === 'python') ? CODE_PY : CODE_CPP
  codeArray.textContent = src.array
  codeStack.textContent = src.stack
  codeQueue.textContent = src.queue
  codeTree.textContent = src.tree
}
langSel.addEventListener('change', renderCode)
renderCode()

// ---------- copy functions ----------
copyCodeBtn.addEventListener('click', ()=>{
  const text = [codeArray.textContent, codeStack.textContent, codeQueue.textContent, codeTree.textContent].join('\n\n// -----\n')
  navigator.clipboard.writeText(text).then(()=> alert('Code copied to clipboard'))
})
copyPseudoBtn.addEventListener('click', ()=>{
  const text = el('pseudocode-block').innerText
  navigator.clipboard.writeText(text).then(()=> alert('Pseudocode copied'))
})

// ---------- export/import pseudocode ----------
exportPseudoBtn.addEventListener('click', ()=>{
  const blob = new Blob([el('pseudocode-block').innerText], {type: 'text/plain'})
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a'); a.href=url; a.download='pseudocode.txt'; a.click(); URL.revokeObjectURL(url)
})

// ---------- CRUD (localStorage key) ----------
const STORAGE_KEY = 'dsa_crud_items'
let records = []

function loadFromStorage(){
  const raw = localStorage.getItem(STORAGE_KEY)
  records = raw ? JSON.parse(raw) : []
}
function saveToStorage(){
  localStorage.setItem(STORAGE_KEY, JSON.stringify(records))
}
function renderTable(){
  crudTableBody.innerHTML = ''
  if(records.length === 0){
    crudTableBody.innerHTML = '<tr><td colspan="3" style="color:#666">No records found</td></tr>'
    return
  }
  records.forEach(r => {
    const tr = document.createElement('tr')
    const tdName = document.createElement('td'); tdName.textContent = r.name
    const tdCourse = document.createElement('td'); tdCourse.textContent = r.course
    const tdActions = document.createElement('td')
    const editBtn = document.createElement('button'); editBtn.textContent='Edit'; editBtn.style.background='#0b69ff'; editBtn.style.marginRight='8px'
    editBtn.addEventListener('click', ()=> startEdit(r.id))
    const delBtn = document.createElement('button'); delBtn.textContent='Delete'
    delBtn.addEventListener('click', ()=> { if(confirm('Delete this record?')) deleteRecord(r.id) })
    tdActions.appendChild(editBtn); tdActions.appendChild(delBtn)
    tr.appendChild(tdName); tr.appendChild(tdCourse); tr.appendChild(tdActions)
    crudTableBody.appendChild(tr)
  })
}
function createRecord(obj){
  obj.id = Date.now()
  records.push(obj); saveToStorage(); renderTable()
}
function startEdit(id){
  const r = records.find(x=>x.id===id); if(!r) return
  nameInput.value = r.name; courseInput.value = r.course; editId.value = id
  window.scrollTo({ top: el('crud').offsetTop - 80, behavior: 'smooth' })
}
function updateRecord(id, obj){
  const idx = records.findIndex(x=>x.id===id); if(idx===-1) return
  records[idx].name = obj.name; records[idx].course = obj.course
  saveToStorage(); renderTable()
}
function deleteRecord(id){
  records = records.filter(r=>r.id!==id); saveToStorage(); renderTable()
}

// ---------- form events ----------
crudForm.addEventListener('submit', function(e){
  e.preventDefault()
  const name = nameInput.value.trim(), course = courseInput.value.trim()
  if(!name || !course) return alert('Fill both fields')
  const id = editId.value
  if(id){
    updateRecord(Number(id), {name, course})
    editId.value = ''
  } else {
    createRecord({name, course})
  }
  crudForm.reset()
})
el('resetBtn').addEventListener('click', ()=> {crudForm.reset(); editId.value=''})
// export current records as JSON
exportBtn.addEventListener('click', ()=>{
  const blob = new Blob([JSON.stringify(records, null, 2)], {type:'application/json'})
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a'); a.href=url; a.download='dsa_records.json'; a.click(); URL.revokeObjectURL(url)
})
// import JSON file
importFile.addEventListener('change', (ev)=>{
  const file = ev.target.files[0]; if(!file) return
  const reader = new FileReader(); reader.onload = () => {
    try{
      const imported = JSON.parse(reader.result)
      if(Array.isArray(imported)){
        records = imported.map(r => ({ id: r.id || Date.now()+Math.floor(Math.random()*1000), name: r.name || '', course: r.course || '' }))
        saveToStorage(); renderTable(); alert('Import successful')
      } else alert('Invalid JSON format (expecting array)')
    }catch(err){ alert('Failed to parse JSON') }
  }; reader.readAsText(file)
})

// ---------- download helper (downloads files individually) ----------
downloadAllBtn.addEventListener('click', ()=>{
  const files = {
    'index.html': document.documentElement.outerHTML,
    'style.css': (function(){ /* fetch local style content not possible; include current style string */ return `/* Copy the provided style.css content */`})(),
    'scripts.js': (function(){ return `/* Copy the provided scripts.js content */`})()
  }
  for(const name in files){
    const blob = new Blob([files[name]], {type:'text/plain'})
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a'); a.href=url; a.download=name; a.click(); URL.revokeObjectURL(url)
  }
  alert('Files downloaded (one-by-one). For ZIP, upload files to a repo and download as ZIP from GitHub.')
})

// ---------- small nav toggle ----------
menuBtn?.addEventListener('click', ()=>{
  if(nav.style.display === 'flex'){ nav.style.display = 'none' } else { nav.style.display = 'flex'; nav.style.flexDirection='column'; nav.style.gap='8px' }
})

// ---------- init ----------
loadFromStorage()
renderTable()
