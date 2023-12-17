my_array=(
GestionComptes.feature,
GestionDocuments.feature,
Login.feature
)

N=2

(
for str in ${my_array[@]}; do
      ((i=i%N)); ((i++==0)) && wait
      npx cypress run --spec "cypress/e2e/"$str --config baseUrl="$1" --browser chrome  &
done    
)
