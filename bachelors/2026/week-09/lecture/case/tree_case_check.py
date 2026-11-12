"""Recompute the week 9 teaching tree and MDI using shipped CSV.
Run from any directory: python case/tree_case_check.py
"""
from pathlib import Path
import pandas as pd
from sklearn.tree import DecisionTreeClassifier

p=Path(__file__).resolve().parents[1]/'tree_training_data.csv'
df=pd.read_csv(p)
X=df[['area_m2','minutes_to_center','rooms']]
y=df['high_rent_class']
model=DecisionTreeClassifier(criterion='gini',max_depth=3,min_samples_leaf=2,random_state=42).fit(X,y)
t=model.tree_;n=len(X)
rows=[]
for node in range(t.node_count):
    left,right=t.children_left[node],t.children_right[node]
    if left==right:continue
    nv,nl,nr=[int(t.n_node_samples[i]) for i in [node,left,right]]
    imp=t.impurity[node]
    delta=(nv/n)*(imp-(nl/nv)*t.impurity[left]-(nr/nv)*t.impurity[right])
    rows.append((node,X.columns[t.feature[node]],nv,delta))
print('Leaf count',t.n_leaves,'max depth',t.max_depth)
for node,feature,nv,delta in rows:
    print(f'node {node:>2} | {feature:<20} n={nv:>2} delta={delta:.8f}')
print('normalized',dict(zip(X.columns,model.feature_importances_.round(4))))
print('total delta',sum(x[-1] for x in rows))
assert len(rows)==5 and t.max_depth==3
assert abs(model.feature_importances_[X.columns.get_loc('minutes_to_center')]-0.701)<0.002
