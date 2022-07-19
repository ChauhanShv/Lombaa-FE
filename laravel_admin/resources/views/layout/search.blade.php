<form action="" method="get" class="form-horizontal">
    <div class="container">
        <div class="row" style="margin-top: 10px; margin-bottom: 10px;">
            @foreach($filter as $key => $value)
                @if($value['type'] === 'select')
                <div class="select2-container select2-container-active select2-dropdown-open" id="s2id_autogen2">
                    <select value="{{$value['value']}}" name="{{$key}}" style='vertical-align: top; width:50%;'>
                        <option value="0">{{ $value['placeholder'] }}</option>
                        @foreach ($value['options'] as $okey => $option)
                            <option {{ ($value['value'] == $option->key) ? 'SELECTED' : ''  }} value="{{ $option->key }}">{{ $option->value }}</option>
                        @endforeach
                    </select>
                </div>
                @else
                    <input type="{{$value['type']}}" name="{{$key}}" value="{{$value['value']}}" placeholder="{{$value['placeholder']}}" class="span3 m-wrap md">
                @endif
            @endforeach
            <input type="hidden" name="search" value="true" />
        </div>
        <div class="row" style="margin-top: 10px; margin-bottom: 10px; text-align:center;">
            @csrf
            <button type="submit" class="tip-bottom" title="Search"><i class="icon-search icon-white"></i>Search</button>
        </div>
    </div>
</form>
